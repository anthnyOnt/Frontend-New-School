import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/login/service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagenes: string[] = [
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.jpg'
  ];
  isLoggedIn = false;
  indiceActual: number = 0;
  loading = false;
  error = '';
  returnUrl!: string; // Cambié esto de "main" a string
  message!: string;
  registered!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirigir a home si ya está logueado
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  ngOnInit() {

    // Obtener la URL de retorno o usar el home por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Comprobar si hay un mensaje en la URL
    this.message = this.route.snapshot.queryParams['message'];
    
    // Comprobar si viene de un registro exitoso
    this.registered = this.route.snapshot.queryParams['registered'] === 'true';
    
    // Redirigir solo si está autenticado y no viene de un registro
    if (this.isLoggedIn && !this.registered) {
      if(this.authService.getRolUsuario() === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if(this.authService.getRolUsuario() === 'DOCENTE') { 
        this.router.navigate(['/profesor']);
      } else if(this.authService.getRolUsuario() === 'ESTUDIANTE') {
        this.router.navigate(['/estudiante']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }
  
  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }
  
}
