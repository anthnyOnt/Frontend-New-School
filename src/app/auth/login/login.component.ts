import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl!: string; // Cambié esto de "main" a string
  message!: string;
  registered!: boolean;
  isLoggedIn = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirigir a home si ya está logueado
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  // Añade este getter para acceder a los controles del formulario
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    // Obtener la URL de retorno o usar el home por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Comprobar si hay un mensaje en la URL
    this.message = this.route.snapshot.queryParams['message'];
    
    // Comprobar si viene de un registro exitoso
    this.registered = this.route.snapshot.queryParams['registered'] === 'true';
    
    // Redirigir solo si está autenticado y no viene de un registro
    if (this.isLoggedIn && !this.registered) {
      if(this.authService.getRolUsuario() === 'admin') {
        this.router.navigate(['/admin']);
      } else if(this.authService.getRolUsuario() === 'profesor') { 
        this.router.navigate(['/profesor']);
      } else if(this.authService.getRolUsuario() === 'estudiante') {
        this.router.navigate(['/estudiante']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
  
    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value
    })
    .subscribe({
      next: (data) => {
        // Navegar a la ruta 'main' en lugar de returnUrl
        if(this.authService.getRolUsuario() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if(this.authService.getRolUsuario() === 'PROFESOR') { 
          this.router.navigate(['/profesor']);
        } else if(this.authService.getRolUsuario() === 'ESTUDIANTE') {
          this.router.navigate(['/estudiante']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }
}