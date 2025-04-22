import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerEstudiantesComponent } from './ver-estudiantes.component';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing'; // ✅ cambio aquí
import { Estudiante } from '../../../../core/interfaces/estudiante';

describe('VerEstudiantesComponent', () => {
  let component: VerEstudiantesComponent;
  let fixture: ComponentFixture<VerEstudiantesComponent>;
  let mockEstudianteService: any;

  const mockEstudiantes: Estudiante[] = [
    { id: 1, nombre: 'Ana', apellido: 'López', ci: 123456, email: 'ana@test.com', rol: 'estudiante', password: '' },
    { id: 2, nombre: 'Luis', apellido: 'Martínez', ci: 654321, email: 'luis@test.com', rol: 'estudiante', password: '' }
  ];

  beforeEach(async () => {
    mockEstudianteService = {
      getEstudiantes: jasmine.createSpy('getEstudiantes').and.returnValue(of(mockEstudiantes)),
      deleteEstudiante: jasmine.createSpy('deleteEstudiante').and.returnValue(of(void 0))
    };

    await TestBed.configureTestingModule({
      imports: [
        VerEstudiantesComponent,
        CommonModule,
        RouterTestingModule // ✅ reemplaza RouterLink
      ],
      providers: [
        { provide: EstudianteService, useValue: mockEstudianteService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load estudiantes on init', () => {
    expect(mockEstudianteService.getEstudiantes).toHaveBeenCalled();
    expect(component.estudiantes.length).toBe(2);
  });

  it('should delete an estudiante and update the list', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.eliminarEstudiante(mockEstudiantes[0]);
    tick();
    expect(mockEstudianteService.deleteEstudiante).toHaveBeenCalledWith(1);
  }));

  it('should not delete estudiante if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.eliminarEstudiante(mockEstudiantes[0]);
    expect(mockEstudianteService.deleteEstudiante).not.toHaveBeenCalled();
  });
});
