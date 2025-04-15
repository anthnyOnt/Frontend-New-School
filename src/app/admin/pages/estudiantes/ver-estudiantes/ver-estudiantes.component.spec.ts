import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEstudiantesComponent } from './ver-estudiantes.component';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { of } from 'rxjs';
import { Estudiante } from '../../../../core/interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('VerEstudiantesComponent', () => {
  let component: VerEstudiantesComponent;
  let fixture: ComponentFixture<VerEstudiantesComponent>;
  let estudianteServiceSpy: jasmine.SpyObj<EstudianteService>;
  
  const mockEstudiantes: Estudiante[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', ci: 123456, email: 'juan@example.com', rol: 'estudiante', password: '' },
    { id: 2, nombre: 'María', apellido: 'López', ci: 654321, email: 'maria@example.com', rol: 'estudiante', password: '' }
  ];

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('EstudianteService', ['getEstudiantes', 'deleteEstudiante']);
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => '1' // Example ID, adjust as needed
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterLink,
        VerEstudiantesComponent
      ],
      providers: [
        { provide: EstudianteService, useValue: spy },
        { provide: ActivatedRoute, useValue: activatedRouteMock}
        
      ]
    }).compileComponents();

    estudianteServiceSpy = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstudiantesComponent);
    component = fixture.componentInstance;
    

    estudianteServiceSpy.getEstudiantes.and.returnValue(of(mockEstudiantes));
    
    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia cargar a los estudiantes', () => {
    expect(estudianteServiceSpy.getEstudiantes).toHaveBeenCalled();
    expect(component.estudiantes.length).toBe(2);
    expect(component.estudiantes).toEqual(mockEstudiantes);
  });

  it('Deberia eliminar al estudiante tras confirmar', () => {

    estudianteServiceSpy.deleteEstudiante.and.returnValue(of(void 0));
    

    spyOn(window, 'confirm').and.returnValue(true);
    

    component.eliminarEstudiante(mockEstudiantes[0]);
    

    expect(estudianteServiceSpy.deleteEstudiante).toHaveBeenCalledWith(1);
    

    expect(component.estudiantes.length).toBe(1);
    expect(component.estudiantes[0].id).toBe(2);
  });

  it('Deberia usar trackByID para devolver la id del estudiante', () => {
    const estudiante = mockEstudiantes[0];
    expect(component.trackById(0, estudiante)).toBe(estudiante.id);
  });
});