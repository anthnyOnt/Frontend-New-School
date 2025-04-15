import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrarEstudianteComponent } from './registrar-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudiante } from '../../../core/interfaces/estudiante';
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

  it('debería llamar a addEstudiante y navegar al registrar un estudiante válido', fakeAsync(() => {
    // Simulación de un estudiante registrado exitosamente
    const mockEstudiante: Estudiante = {
      id: 1, // Simulamos un ID asignado por la API
      nombre: 'Juan',
      apellido: 'Pérez',
      ci: 12345678, // Cambiado a número si el modelo lo requiere
      email: 'juan@example.com',
      rol: 'estudiante',
      password: 'Passw0rd@'
    };
  
    // Simulación de respuesta exitosa del servicio
    estudianteService.addEstudiante.and.returnValue(of(mockEstudiante));
  
    // Llenar el formulario con datos válidos
    component.registroForm.controls['nombre'].setValue('Juan');
    component.registroForm.controls['apellido'].setValue('Pérez');
    component.registroForm.controls['carnet'].setValue('12345678'); // Se mantiene string porque viene de un input
    component.registroForm.controls['email'].setValue('juan@example.com');
    component.registroForm.controls['password'].setValue('Passw0rd@');
  
    // Ejecutar el método registrar
    component.registrar();
    
    // Avanzar el tiempo simulado para la suscripción
    tick();
  
    // Verificar que el servicio fue llamado con los datos correctos
    expect(estudianteService.addEstudiante).toHaveBeenCalledWith({
      id: 0, // Se envía 0 porque el backend asignará un ID
      nombre: 'Juan',
      apellido: 'Pérez',
      ci: 12345678, // Convertido a número si el modelo lo requiere
      email: 'juan@example.com',
      rol: 'estudiante',
      password: 'Passw0rd@'
    });
  
    // Verificar que se llamó a la navegación
    expect(router.navigate).toHaveBeenCalledWith(['/admin/estudiantes']);
  }));
  
});

