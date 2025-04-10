import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RegistrarEstudianteComponent } from './registrar-estudiante.component';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';

describe('RegistrarEstudianteComponent', () => {
  let component: RegistrarEstudianteComponent;
  let fixture: ComponentFixture<RegistrarEstudianteComponent>;
  let estudianteServiceSpy: jasmine.SpyObj<EstudianteService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('EstudianteService', ['addEstudiante']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        RegistrarEstudianteComponent
      ],
      providers: [
        { provide: EstudianteService, useValue: spy }
      ]
    }).compileComponents();

    estudianteServiceSpy = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Crear componente', () => {
    expect(component).toBeTruthy();
  });
  it('Formulario vacio invalido', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });
  
  it('Validacion nombre', () => {
    let nombre = component.registroForm.controls['nombre'];
    expect(nombre.valid).toBeFalsy();
  
    let errors = nombre.errors || {};
    expect(errors['required']).toBeTruthy();
  
    nombre.setValue('Juan');
    errors = nombre.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(nombre.valid).toBeTruthy();
  
    nombre.setValue('J');
    errors = nombre.errors || {};
    expect(errors['minlength']).toBeTruthy();
    
    nombre.setValue('Juan123');
    errors = nombre.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  
  it('Validacion Apellido', () => {
    let apellido = component.registroForm.controls['apellido'];
    expect(apellido.valid).toBeFalsy();
  
    let errors = apellido.errors || {};
    expect(errors['required']).toBeTruthy();
  
    apellido.setValue('Pérez');
    errors = apellido.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(apellido.valid).toBeTruthy();
  });
  
  it('Carnet Validacion', () => {
    let carnet = component.registroForm.controls['carnet'];
    expect(carnet.valid).toBeFalsy();
  
    let errors = carnet.errors || {};
    expect(errors['required']).toBeTruthy();
  
    carnet.setValue('123456');
    errors = carnet.errors || {};
    expect(carnet.valid).toBeTruthy();

    carnet.setValue('ABC123');
    errors = carnet.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  
  it('Validacion email', () => {
    let email = component.registroForm.controls['email'];
    expect(email.valid).toBeFalsy();
  
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(email.valid).toBeTruthy();
  
    email.setValue('invalid-email');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });
  
  it('Validacion contrasena', () => {
    let password = component.registroForm.controls['password'];
    expect(password.valid).toBeFalsy();
  
    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  
    password.setValue('Password1!');
    errors = password.errors || {};
    expect(password.valid).toBeTruthy();
  
    password.setValue('password1!');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  
    password.setValue('Password!');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  
    password.setValue('Password1');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  
    password.setValue('Pas1!');
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  
  it('Formulario completamente valido', () => {
    component.registroForm.controls['nombre'].setValue('Juan');
    component.registroForm.controls['apellido'].setValue('Pérez');
    component.registroForm.controls['carnet'].setValue('123456');
    component.registroForm.controls['email'].setValue('juan@example.com');
    component.registroForm.controls['password'].setValue('Password1!');
    
    expect(component.registroForm.valid).toBeTruthy();
  });
});