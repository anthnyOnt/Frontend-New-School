import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/login/service/auth.service';
import { NavElement } from '../core/interfaces/nav-element';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() elements: NavElement[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    // Mostrar indicador de carga o deshabilitar la interfaz si es necesario
    this.authService.logout();
    this.router.navigate(["/"])
  }
}
