import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

/**
 * Configuración global de la aplicación Angular.
 * 
 * - Aquí centralizo todos los providers del core del proyecto.
 * - Uso provideRouter para la configuración de rutas principales (routes).
 * - provideHttpClient incluye el interceptor para el token JWT, asegurando que 
 *   todas las peticiones lleven el Authorization header automáticamente.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Defino el routing principal
    provideHttpClient(withInterceptors([TokenInterceptor])) // Interceptor para el JWT en todas las peticiones HTTP
  ]
};
