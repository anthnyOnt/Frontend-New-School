import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../login/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ci: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Validador personalizado para que las contraseñas coincidan
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // Detener si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.error = '';
  
    const newUser = {
      nombre: this.f['nombre'].value,
      apellido: this.f['apellido'].value,
      ci: this.f['ci'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      rol: 'USER' // Rol por defecto
    } as any; // Usamos 'as any' para evitar el error de tipado con 'id'
  
    this.authService.register(newUser)
      .subscribe({
        next: () => {
          this.loading = false; // Importante: resetear loading antes de navegar
          // Registro exitoso, redirigir a login
          this.router.navigate(['/login'], { 
            queryParams: { registered: true } 
          });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        },
        complete: () => {
          // Asegurarse de que loading sea false incluso si no hay next o error
          this.loading = false;
        }
      });
  }
}