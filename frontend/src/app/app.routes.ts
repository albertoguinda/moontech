import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { UsersComponent } from './pages/users/users';
import { LogsComponent } from './pages/logs/logs';
import { AuthGuard } from './guards/auth.guard';

/**
 * Definición de rutas principales de la aplicación.
 * 
 * - '' (raíz): Pantalla de login.
 * - 'users': CRUD de usuarios (ruta protegida, solo autenticados).
 * - 'logs': Visualización de logs (ruta protegida, solo autenticados).
 * - '**': Cualquier ruta no encontrada redirige al login.
 * 
 * Uso el AuthGuard para evitar acceso directo a /users y /logs sin estar logueado,
 * cumpliendo así los requisitos de la prueba técnica.
 */
export const routes: Routes = [
  { path: '', component: LoginComponent }, // Página inicial: login
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, // CRUD solo autenticados
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] }, // Logs solo autenticados
  { path: '**', redirectTo: '' } // Redirección para rutas no válidas
];
