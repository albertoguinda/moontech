import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

/**
 * Punto de entrada principal de la aplicación Angular.
 * 
 * - Importo 'zone.js', requerido por Angular para el manejo del cambio de detección.
 * - Utilizo la función moderna bootstrapApplication para inicializar la app
 *   usando el componente raíz (AppComponent) y la configuración de la aplicación (appConfig).
 * - Si hay algún error durante el arranque, lo muestro en consola para facilitar el debug.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
