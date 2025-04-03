import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEstudiantesComponent } from './ver-estudiantes.component';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estudiante } from '../../../core/interfaces/estudiante';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('VerEstudiantesComponent', () => {
  let component: VerEstudiantesComponent;
  let fixture: ComponentFixture<VerEstudiantesComponent>;
  let estudianteServiceSpy: jasmine.SpyObj<EstudianteService>;

  beforeEach(async () => {
    const estudianteServiceMock = jasmine.createSpyObj('EstudianteService', ['getEstudiantes', 'deleteEstudiante']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink, VerEstudiantesComponent],
      providers: [
        { provide: EstudianteService, useValue: estudianteServiceMock },
        { 
          provide: ActivatedRoute, 
          useValue: { params: of({ id: 1 }) } // Simulando parámetros de ruta
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerEstudiantesComponent);
    component = fixture.componentInstance;
    estudianteServiceSpy = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los estudiantes al inicializarse', () => {
    const estudiantesMock: Estudiante[] = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', ci: 12345678, email: 'juan@example.com', rol: 'estudiante', password: 'Passw0rd@' },
      { id: 2, nombre: 'María', apellido: 'López', ci: 87654321, email: 'maria@example.com', rol: 'estudiante', password: 'SecureP@ss123' }
    ];

    estudianteServiceSpy.getEstudiantes.and.returnValue(of(estudiantesMock));

    fixture.detectChanges();

    expect(component.estudiantes.length).toBe(2);
    expect(component.estudiantes).toEqual(estudiantesMock);
  });

  it('debería eliminar un estudiante cuando se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const estudiantesMock: Estudiante[] = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', ci: 12345678, email: 'juan@example.com', rol: 'estudiante', password: 'Passw0rd@' },
      { id: 2, nombre: 'María', apellido: 'López', ci: 87654321, email: 'maria@example.com', rol: 'estudiante', password: 'SecureP@ss123' }
    ];

    component.estudiantes = [...estudiantesMock];

    estudianteServiceSpy.deleteEstudiante.and.returnValue(of(undefined));

    component.eliminarEstudiante(estudiantesMock[0]);

    expect(estudianteServiceSpy.deleteEstudiante).toHaveBeenCalledWith(1);
    expect(component.estudiantes.length).toBe(1);
    expect(component.estudiantes[0].id).toBe(2);
  });

  it('no debería eliminar un estudiante si se cancela la confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const estudiantesMock: Estudiante[] = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', ci: 12345678, email: 'juan@example.com', rol: 'estudiante', password: 'Passw0rd@' },
      { id: 2, nombre: 'María', apellido: 'López', ci: 87654321, email: 'maria@example.com', rol: 'estudiante', password: 'SecureP@ss123' }
    ];

    component.estudiantes = [...estudiantesMock];

    component.eliminarEstudiante(estudiantesMock[0]);

    expect(estudianteServiceSpy.deleteEstudiante).not.toHaveBeenCalled();
    expect(component.estudiantes.length).toBe(2);
  });

  it('debería retornar el id del estudiante en trackById', () => {
    const estudianteMock: Estudiante = { id: 5, nombre: 'Ana', apellido: 'Gómez', ci: 6543210, email: 'ana@example.com', rol: 'estudiante', password: 'Str0ngP@ss' };
    expect(component.trackById(0, estudianteMock)).toBe(5);
  });

  it('debería llamar a editarEstudiante (pero sin implementación aún)', () => {
    const estudianteMock: Estudiante = { id: 3, nombre: 'Pedro', apellido: 'Ruiz', ci: 9876543, email: 'pedro@example.com', rol: 'estudiante', password: 'P@ssword123' };
    expect(() => component.editarEstudiante(estudianteMock)).not.toThrow();
  });

  it('debería validar que el CI solo contiene números', () => {
    const estudiantesMock: Estudiante[] = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', ci: 12345678, email: 'juan@example.com', rol: 'estudiante', password: 'Passw0rd@' },
      { id: 2, nombre: 'María', apellido: 'López', ci: '87654321' as any, email: 'maria@example.com', rol: 'estudiante', password: 'SecureP@ss123' }
    ];
  
    // Simulamos que el servicio devuelve los estudiantes
    estudianteServiceSpy.getEstudiantes.and.returnValue(of(estudiantesMock));
  
    // Llamamos al método que debería cargar los estudiantes
    fixture.detectChanges(); // Esto dispara ngOnInit y carga los estudiantes
  
    // Verificamos si los estudiantes se han cargado correctamente
    expect(component.estudiantes.length).toBe(2);
  
    // Validación de que el CI de 'María' es un número
    expect(isNaN(Number(component.estudiantes[1].ci))).toBe(false);
  });
  
  
});
