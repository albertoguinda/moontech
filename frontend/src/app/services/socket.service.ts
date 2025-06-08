import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SocketService {
  private socket: Socket;

  constructor() {
    // Cambia la URL si tu backend está en otro host/puerto
    this.socket = io("http://localhost:3000");
  }

  // Escuchar un evento de log en tiempo real
  onNewLog(): Observable<any> {
    return new Observable(observer => {
      this.socket.on("nuevo-log", (log) => {
        observer.next(log);
      });
    });
  }
}
