import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio centralizado para el manejo CRUD de usuarios.
 * Aquí abstraigo toda la lógica de acceso a la API de usuarios,
 * lo que facilita la reutilización, el mantenimiento y el testing.
 *
 * - Todos los métodos retornan Observables para integración reactiva en Angular.
 * - La URL base está centralizada en una constante.
 * - En cada método se invoca el endpoint REST correspondiente.
 */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los usuarios (GET).
   */
  getAll() {
    return this.http.get<any[]>(this.API);
  }

  /**
   * Crea un nuevo usuario (POST).
   */
  create(user: any) {
    return this.http.post<any>(this.API, user);
  }

  /**
   * Actualiza un usuario existente por ID (PUT).
   */
  update(id: string, user: any) {
    return this.http.put<any>(`${this.API}/${id}`, user);
  }

  /**
   * Elimina un usuario por ID (DELETE).
   */
  delete(id: string) {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
