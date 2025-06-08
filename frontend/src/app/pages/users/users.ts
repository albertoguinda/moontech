import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente principal de gestión de usuarios (CRUD).
 * Utilizo Angular Standalone Component, por lo que declaro los imports aquí.
 * Desde aquí puedo visualizar, crear, actualizar y eliminar usuarios.
 */
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html'
})
export class UsersComponent implements OnInit {
  // Array de usuarios cargados desde la API.
  users: any[] = [];

  // Objeto del formulario de usuario, usado tanto para crear como editar.
  userForm: any = { nombre: '', email: '', password: '', activo: true };

  constructor(
    private usersService: UsersService, // Servicio para la gestión de usuarios vía API REST.
    private auth: AuthService,          // Servicio de autenticación.
    private router: Router              // Router para redirecciones (ej. logout).
  ) {}

  /**
   * Al iniciar el componente, obtengo la lista de usuarios del backend.
   */
  ngOnInit() {
    this.getUsers();
  }

  /**
   * Obtengo todos los usuarios de la base de datos.
   * Si hay error (por ejemplo, token expirado), hago logout automáticamente.
   */
  getUsers() {
    this.usersService.getAll().subscribe({
      next: data => this.users = data,
      error: () => this.auth.logout()
    });
  }

  /**
   * Acción de enviar el formulario:
   * Si userForm._id existe, hago un update, si no, creo nuevo usuario.
   * Borro el password si está vacío en edición para no sobreescribirlo con string vacío.
   */
  addOrUpdateUser() {
    if (this.userForm._id) {
      const data = { ...this.userForm };
      if (!data.password) delete data.password; // Solo actualizo password si se ha puesto.
      this.usersService.update(data._id, data).subscribe(() => {
        this.getUsers();
        this.resetForm();
      });
    } else {
      this.usersService.create(this.userForm).subscribe(() => {
        this.getUsers();
        this.resetForm();
      });
    }
  }

  /**
   * Cuando el usuario quiere editar, copio los datos al formulario y vacío el password.
   * Así evito mostrar la password en claro ni enviarla vacía accidentalmente.
   */
  editUser(user: any) {
    this.userForm = { ...user, password: '' };
  }

  /**
   * Al borrar usuario, pido confirmación para evitar errores.
   */
  deleteUser(id: string) {
    if (confirm('¿Seguro que quieres borrar este usuario?')) {
      this.usersService.delete(id).subscribe(() => this.getUsers());
    }
  }

  /**
   * Reseteo el formulario de usuario a su estado inicial.
   */
  resetForm() {
    this.userForm = { nombre: '', email: '', password: '', activo: true };
  }

  goToLogs() {
  if (this.auth.isAuthenticated()) {
    this.router.navigate(['/logs']);
  } else {
    this.router.navigate(['/']);
  }
}

  /**
   * Hago logout y redirijo al login (método del AuthService).
   */
  logout() {
    this.auth.logout();
  }
}
