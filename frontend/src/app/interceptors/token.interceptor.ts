// TokenInterceptor para Angular (Angular 16+)
// Este interceptor añade automáticamente el JWT a cada petición HTTP si el usuario está autenticado.
// Así me aseguro de que todas las llamadas protegidas llevan el Authorization: Bearer <token> al backend.

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Uso la función HttpInterceptorFn y la nueva DI con inject() (Angular moderno)
export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);      // Servicio de autenticación
  const token = auth.getToken();         // Obtengo el token JWT (si existe)

  if (token) {
    // Si hay token, clono la petición y añado el header Authorization
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  // Si no hay token, dejo pasar la petición original (p.ej. login, register)
  return next(req);
};
