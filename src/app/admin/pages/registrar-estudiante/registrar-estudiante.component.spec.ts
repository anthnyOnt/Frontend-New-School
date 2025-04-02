import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrarEstudianteComponent } from './registrar-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrarEstudianteComponent', () => {
  let component: RegistrarEstudianteComponent;
  let fixture: ComponentFixture<RegistrarEstudianteComponent>;
  let estudianteService: jasmine.SpyObj<EstudianteService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const estudianteServiceSpy = jasmine.createSpyObj('EstudianteService', ['addEstudiante']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      //imports: [ReactiveFormsModule, HttpClientTestingModule],
      imports: [RegistrarEstudianteComponent, ReactiveFormsModule, RouterTestingModule],
      //declarations: [RegistrarEstudianteComponent],
      providers: [
        { provide: EstudianteService, useValue: estudianteServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarEstudianteComponent);
    component = fixture.componentInstance;
    estudianteService = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los campos vacíos', () => {
    expect(component.registroForm.value).toEqual({
      nombre: '',
      apellido: '',
      carnet: '',
      email: '',
      password: ''
    });
  });

  it('debería marcar los campos como inválidos si están vacíos', () => {
    component.registroForm.controls['nombre'].setValue('');
    component.registroForm.controls['apellido'].setValue('');
    component.registroForm.controls['carnet'].setValue('');
    component.registroForm.controls['email'].setValue('');
    component.registroForm.controls['password'].setValue('');
    expect(component.registroForm.invalid).toBeTrue();
  });

  it('debería permitir el envío si todos los campos son válidos', () => {
    component.registroForm.controls['nombre'].setValue('Juan');
    component.registroForm.controls['apellido'].setValue('Pérez');
    component.registroForm.controls['carnet'].setValue('12345678');
    component.registroForm.controls['email'].setValue('juan@example.com');
    component.registroForm.controls['password'].setValue('Passw0rd@');
    expect(component.registroForm.valid).toBeTrue();
  }); 
});
