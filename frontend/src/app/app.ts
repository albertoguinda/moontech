import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la aplicación Angular.
 * 
 * - Uso el patrón standalone de Angular 16+ para simplificar la carga de módulos.
 * - El único propósito de este componente es renderizar el <router-outlet>,
 *   donde se cargarán dinámicamente las vistas según la ruta activa.
 * - De esta forma, la app queda totalmente desacoplada de cualquier layout fijo,
 *   permitiendo una estructura limpia y mantenible.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {}
