import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './auth/login/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FRONTEND-NEW-SCHOOL';
  isAuthenticated = false;

  adminNavElements = [
    {name: 'Estudiantes', icon: "fas fa-user-graduate", route: '/admin/estudiantes'},
    {name: 'Grados', icon: "fas fa-graduation-cap", route: '/admin/grados'},
    {name: 'Profesores', icon: "fas fa-chalkboard-teacher", route:'/admin/profesores'},
    {name: 'Cursos', icon: "fas fa-book", route:'/admin/cursos'}
  ]

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscribirse al observable de autenticación para detectar cambios
    this.authService.isAuthenticated.subscribe(
      auth => this.isAuthenticated = auth
    );
  }
}
