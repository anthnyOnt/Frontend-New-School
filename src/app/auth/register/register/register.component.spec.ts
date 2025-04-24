import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule}  from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs'; 
// Removed invalid import of DynamicTestModule

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }) // Simula que recibe el parámetro "id" = 123
          }
        },
        {
          provide: Router,
          useValue: {} // Simulación vacía o personalizada si usas el Router
        }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  

  it('debería inicializar el formulario con valores vacíos', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeDefined();
    expect(component.f['nombre'].value).toBe('');
    expect(component.f['apellido'].value).toBe('');
    expect(component.f['ci'].value).toBe('');
    expect(component.f['email'].value).toBe('');
    expect(component.f['password'].value).toBe('');
    expect(component.f['confirmPassword'].value).toBe('');
  });

  it('debería marcar el formulario como inválido si los campos requeridos están vacíos', () => {
    component.ngOnInit();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido si la cédula no cumple con el formato', () => {
    component.ngOnInit();
    component.f['ci'].setValue('123456789'); // Más de 8 dígitos
    expect(component.f['ci'].valid).toBeFalsy();

    component.f['ci'].setValue('1234abcd'); // Contiene letras
    expect(component.f['ci'].valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido si las contraseñas no coinciden', () => {
    component.ngOnInit();
    component.f['password'].setValue('password123');
    component.f['confirmPassword'].setValue('differentPassword');
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.f['confirmPassword'].errors?.['mustMatch']).toBeTruthy();
  });
});
