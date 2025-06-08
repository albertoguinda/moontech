import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * Servicio de autenticación centralizado.
 * Permite hacer login, logout, y gestionar el token JWT.
 * El token se guarda de forma local (localStorage) para su uso en las peticiones autenticadas.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // URL base del backend para autenticación.
  private API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Realizo login enviando las credenciales al backend.
   * El backend responde con un token JWT si la autenticación es correcta.
   */
  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/login`, { email, password });
  }

  /**
   * Hago logout eliminando el token localmente
   * y redirijo al login.
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  /**
   * Guardo el token JWT en localStorage tras login.
   */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Obtengo el token JWT almacenado, o null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Compruebo si el usuario está autenticado:
   * Si hay token guardado, devuelvo true.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
