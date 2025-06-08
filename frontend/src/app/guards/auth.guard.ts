// AuthGuard para rutas protegidas en la app Angular (Angular 16+)
// Si el usuario NO está autenticado (no hay JWT en localStorage), redirijo al login.
// Así solo pueden entrar a /users o /logs los usuarios logueados.

// Uso CanActivateFn y la nueva inyección con inject() (Angular 16+)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);   // Servicio de autenticación
  const router = inject(Router);      // Router para redirección

  // Compruebo si hay token JWT en localStorage
  if (!auth.isAuthenticated()) {
    // No autenticado → redirijo al login
    router.navigate(['/']);
    return false;
  }

  // Autenticado → dejo pasar
  return true;
};
