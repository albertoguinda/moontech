import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Componente de Login: gestiona el formulario de autenticación.
// Si el login es correcto, almaceno el token y navego a /users.
// Si hay error, lo muestro por pantalla.

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  // Inputs del formulario.
  email = '';
  password = '';
  error = '';

  // Inyecto el servicio de autenticación y el router para navegación.
  constructor(private auth: AuthService, private router: Router) {}

  // Al enviar el formulario: llamo a la API de login.
  // Si devuelve token, lo guardo y navego al panel de usuarios.
  // Si falla, muestro el mensaje de error.
  onSubmit() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        if (res.token) {
          this.auth.setToken(res.token);
          this.router.navigate(['/users']);
        } else {
          this.error = res.error || 'Error de login';
        }
      },
      error: err => {
        this.error = err.error?.error || 'Error de login';
      }
    });
  }
}
