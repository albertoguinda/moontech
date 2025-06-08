import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { LogsService } from "../../services/logs.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-logs",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./logs.html"
})
export class LogsComponent implements OnInit {
  logs: any[] = [];

  // Inyecto logsService, router y authService
  constructor(
    private logsService: LogsService,
    public router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.logsService.getLogs().subscribe((logs) => {
      this.logs = logs;
    });
  }

  // Método para cerrar sesión y redirigir al login
  logout() {
    this.auth.logout();
  }
}
