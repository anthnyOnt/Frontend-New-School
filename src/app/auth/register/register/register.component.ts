import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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
  selectedUserType: string = 'estudiante';
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
      confirmPassword: ['', Validators.required],
      fechaNacimiento: [''],
      cargo: [''],
      especialidad: ['']
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
    
    this.updateValidatorsBasedOnUserType(this.selectedUserType);
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

  updateValidatorsBasedOnUserType(userType: string) {
    const fechaNacimientoControl = this.registerForm.get('fechaNacimiento');
    const cargoControl = this.registerForm.get('cargo');
    const especialidadControl = this.registerForm.get('especialidad');
    
    fechaNacimientoControl?.clearValidators();
    cargoControl?.clearValidators();
    especialidadControl?.clearValidators();
  
    if (userType === 'estudiante') {
      fechaNacimientoControl?.setValidators([Validators.required]);
    } else if (userType === 'admin') {
      cargoControl?.setValidators([Validators.required]);
    } else if (userType === 'profesor') {
      especialidadControl?.setValidators([Validators.required]);
    }

    fechaNacimientoControl?.updateValueAndValidity();
    cargoControl?.updateValueAndValidity();
    especialidadControl?.updateValueAndValidity();
  }

  onUserTypeChange(userType: string) {
    this.selectedUserType = userType;
    this.updateValidatorsBasedOnUserType(userType);
  }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
  
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
    } as any; 
    
    if (this.selectedUserType === 'estudiante') {
      newUser.rol = 'ESTUDIANTE';
      newUser.datosEspecificos = {
        fechaNacimiento: this.f['fechaNacimiento'].value
      };
    } else if (this.selectedUserType === 'profesor') {
      newUser.rol = 'DOCENTE';
      newUser.datosEspecificos = {
        licenciatura: this.f['especialidad'].value
      };
    } else if (this.selectedUserType === 'admin') {
      newUser.rol = 'ADMIN';
      newUser.datosEspecificos = {
        cargo: this.f['cargo'].value
      };
    }
  
    this.authService.register(newUser)
      .subscribe({
        next: () => {
          this.loading = false; // Importante: resetear loading antes de navegar
          this.router.navigate(['/login'], { 
            queryParams: { registered: true } 
          });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}