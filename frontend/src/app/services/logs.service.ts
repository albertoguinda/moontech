import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


 // Servicio para consultar el historial de logs de conexiones.
 // Llama a la API REST del backend y obtiene todos los logs.

// - Centralizo aquí las llamadas relacionadas con logs (Single Responsibility).
// - La respuesta se devuelve como Observable para poder usarlo de forma reactiva en el componente.

@Injectable({ providedIn: "root" })
export class LogsService {
  // Endpoint del backend para los logs.
  apiUrl = "http://localhost:3000/api/logs";

  constructor(private http: HttpClient) {}

  // Solicito la lista de logs (auditoría de conexiones y desconexiones).
  // Se usa en el componente de logs para pintar la tabla.
  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
