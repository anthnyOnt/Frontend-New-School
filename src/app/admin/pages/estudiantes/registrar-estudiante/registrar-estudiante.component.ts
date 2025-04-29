import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { Estudiante } from '../../../../core/interfaces/estudiante';

@Component({
  selector: 'app-registrar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-estudiante.component.html',
  styleUrl: './registrar-estudiante.component.scss'
})
export class RegistrarEstudianteComponent {
  registroForm: FormGroup;
  router = inject(Router);
  estudianteService = inject(EstudianteService);
  private fb = inject(FormBuilder);

  constructor() {
    this.registroForm = this.fb.group({
      nombre: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      apellido: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      carnet: ['', [
        Validators.required, 
        Validators.pattern(/^\d{6,10}$/) 
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    });
  }

  registrar() {
    if (this.registroForm.invalid) {
      Object.keys(this.registroForm.controls).forEach(key => {
        const control = this.registroForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    // const estudiante: Estudiante = {
    //   id: 0, 
    //   nombre: this.registroForm.get('nombre')?.value,
    //   apellido: this.registroForm.get('apellido')?.value,
    //   ci: Number(this.registroForm.get('carnet')?.value),
    //   email: this.registroForm.get('email')?.value,
    //   rol: 'estudiante',
    //   password: this.registroForm.get('password')?.value,
    // };

    // this.estudianteService.addEstudiante(estudiante).subscribe({
    //   next: () => {
    //     this.router.navigate(['/admin/estudiantes']);
    //   },
    //   error: (error) => {
    //     console.error('Error registrando estudiante', error);
    //   }
    // });
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get apellido() { return this.registroForm.get('apellido'); }
  get carnet() { return this.registroForm.get('carnet'); }
  get email() { return this.registroForm.get('email'); }
  get password() { return this.registroForm.get('password'); }
}