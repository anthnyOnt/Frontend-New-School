import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesoresPageComponent } from './profesores-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { of } from 'rxjs';
import { Profesor } from '../../../../core/interfaces/profesor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfesorAddComponent } from '../profesores-add/profesores-add.component';

describe('ProfesoresPageComponent', () => {
  let component: ProfesoresPageComponent;
  let fixture: ComponentFixture<ProfesoresPageComponent>;
  let profesorServiceSpy: jasmine.SpyObj<ProfesorService>;

  const mockProfesores: Profesor[] = [
    {
      id: 1,
      nombre: 'Ana',
      fechaNacimiento: new Date('1985-05-12'),
      nacionalidad: 'Boliviana',
      correo: 'ana@example.com',
      telefono: '7654321',
      direccion: 'Av. Ejemplo 123',
      rol: 'Profesor',
      ci: '12345678'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfesorService', ['getProfesores', 'deleteProfesor']);

    await TestBed.configureTestingModule({
      imports: [ProfesoresPageComponent, HttpClientTestingModule, FormsModule, CommonModule, RouterTestingModule],
      providers: [
        { provide: ProfesorService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesoresPageComponent);
    component = fixture.componentInstance;
    profesorServiceSpy = TestBed.inject(ProfesorService) as jasmine.SpyObj<ProfesorService>;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should load profesores on init', () => {
    profesorServiceSpy.getProfesores.and.returnValue(of(mockProfesores));
    component.ngOnInit();
    expect(profesorServiceSpy.getProfesores).toHaveBeenCalled();
  });

  it('should filter profesores by term', () => {
    component.profesores = [...mockProfesores];
    component.terminoBusqueda = 'ana';
    component.filtrarProfesores();
    expect(component.profesoresFiltrados.length).toBe(1);
  });

  it('should handle profesor deletion', () => {
    profesorServiceSpy.getProfesores.and.returnValue(of([]));
    profesorServiceSpy.deleteProfesor.and.returnValue(of(void 0));
    component.manejarProfesorEliminado(1);
    expect(profesorServiceSpy.deleteProfesor).toHaveBeenCalledWith(1);
  });
});