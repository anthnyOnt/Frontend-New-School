import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { ProfesorAddComponent } from './profesores-add.component';
=======
import { ProfesorAddComponent } from './profesores-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { of } from 'rxjs';
import { Profesor } from '../../../../core/interfaces/profesor';
>>>>>>> main

describe('ProfesoresAddComponent', () => {
  let component: ProfesorAddComponent;
  let fixture: ComponentFixture<ProfesorAddComponent>;
<<<<<<< HEAD
=======
  let profesorServiceSpy: jasmine.SpyObj<ProfesorService>;

  const mockProfesor: Profesor = {
    id: 1,
    nombre: 'Juan',
    fechaNacimiento: new Date('1990-01-01'),
    nacionalidad: 'Boliviano',
    correo: 'juan@example.com',
    telefono: '123456789',
    direccion: 'Calle Falsa 123',
    rol: 'Profesor',
    ci: '1234567'
  };
>>>>>>> main

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfesorService', ['addProfesor', 'updateProfesor']);

    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [ProfesorAddComponent]
    })
    .compileComponents();
    
=======
      imports: [ProfesorAddComponent, HttpClientTestingModule],
      providers: [
        { provide: ProfesorService, useValue: spy }
      ]
    }).compileComponents();

>>>>>>> main
    fixture = TestBed.createComponent(ProfesorAddComponent);
    component = fixture.componentInstance;
    profesorServiceSpy = TestBed.inject(ProfesorService) as jasmine.SpyObj<ProfesorService>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form when profesorEditar is null', () => {
    component.profesorEditar = null;
    component.resetForm();
    expect(component.profesor.id).toBe(0);
    expect(component.profesor.nombre).toBe('');
  });

  it('should populate form when profesorEditar is set', () => {
    component.profesorEditar = mockProfesor;
    component.resetForm();
    expect(component.profesor.nombre).toBe('Juan');
  });

  it('should call updateProfesor when editing', () => {
    component.profesorEditar = mockProfesor;
    component.resetForm();
    profesorServiceSpy.updateProfesor.and.returnValue(of(mockProfesor));

    component.guardarProfesor();
    expect(profesorServiceSpy.updateProfesor).toHaveBeenCalledWith(mockProfesor);
  });

  it('should call addProfesor when creating new', () => {
    component.profesorEditar = null;
    component.resetForm();
    profesorServiceSpy.addProfesor.and.returnValue(of(mockProfesor));

    component.guardarProfesor();
    expect(profesorServiceSpy.addProfesor).toHaveBeenCalled();
  });
});