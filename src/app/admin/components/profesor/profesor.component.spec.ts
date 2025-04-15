import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorComponent } from './profesor.component';
import { ProfesorService } from '../../services/profesor/profesor.service';
import { of } from 'rxjs';
import { Profesor } from '../../../core/interfaces/profesor';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfesorComponent', () => {
  let component: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;
  let profesorServiceMock: jasmine.SpyObj<ProfesorService>;

  beforeEach(async () => {
    // Crear un mock del servicio
    profesorServiceMock = jasmine.createSpyObj('ProfesorService', ['getProfesores', 'deleteProfesor']);

    // Crear un mock de ActivatedRoute
    const activatedRouteMock = {
      snapshot: { paramMap: {} } // Puedes agregar más si es necesario
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink],
      providers: [
        { provide: ProfesorService, useValue: profesorServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock } // Inyectar el mock de ActivatedRoute
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Deshabilitar la comprobación de errores de elementos no conocidos
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorComponent);
    component = fixture.componentInstance;
  });

  it('Debe cargar los profesores al inicializar el componente', () => {
    const profesores: Profesor[] = [
      { 
        id: 1, 
        nombre: 'Juan Pérez', 
        rol: 'Profesor', 
        fechaNacimiento: new Date('1990-01-01'), 
        nacionalidad: 'Boliviana', 
        correo: 'juan.perez@example.com', 
        telefono: '123456789', 
        direccion: 'Av. Siempre Viva 742',
        ci:'7928721'
      },
      { 
        id: 2, 
        nombre: 'María López', 
        rol: 'Coordinador', 
        fechaNacimiento: new Date('1985-05-20'), 
        nacionalidad: 'Boliviana', 
        correo: 'maria.lopez@example.com', 
        telefono: '987654321', 
        direccion: 'Av. Los Álamos 123',
        ci:'7928722' 
      }
    ];

    // Simular que el servicio devuelve los profesores
    profesorServiceMock.getProfesores.and.returnValue(of(profesores));

    fixture.detectChanges(); // Disparar la detección de cambios

    expect(component.profesores.length).toBe(2);
    expect(component.profesores).toEqual(profesores);
  });

  it('Debe eliminar un profesor correctamente', () => {
    const profesor: Profesor = { 
      id: 1, 
      nombre: 'Juan Pérez', 
      rol: 'Profesor', 
      fechaNacimiento: new Date('1990-01-01'), 
      nacionalidad: 'Boliviana', 
      correo: 'juan.perez@example.com', 
      telefono: '123456789', 
      direccion: 'Av. Siempre Viva 742',
      ci: '7928721'
    };

    // Simular confirmación y eliminación
    spyOn(window, 'confirm').and.returnValue(true);
    profesorServiceMock.deleteProfesor.and.returnValue(of());

    component.eliminarProfesor(profesor);

    // Verificar que el servicio de eliminación fue llamado
    expect(profesorServiceMock.deleteProfesor).toHaveBeenCalledWith(profesor.id);
    // Verificar que el profesor fue eliminado del arreglo
    expect(component.profesores.find(p => p.id === profesor.id)).toBeUndefined();
  });

  it('No debe eliminar un profesor si no se confirma', () => {
    const profesor: Profesor = { 
      id: 1, 
      nombre: 'Juan Pérez', 
      rol: 'Profesor', 
      fechaNacimiento: new Date('1990-01-01'), 
      nacionalidad: 'Boliviana', 
      correo: 'juan.perez@example.com', 
      telefono: '123456789', 
      direccion: 'Av. Siempre Viva 742',
      ci: '7928722' 
    };

    // Simular que no se confirma la eliminación
    spyOn(window, 'confirm').and.returnValue(false);

    component.eliminarProfesor(profesor);

    // Verificar que el servicio de eliminación no fue llamado
    expect(profesorServiceMock.deleteProfesor).not.toHaveBeenCalled();
  });

  it('Debe llamar a la función editarProfesor con el profesor adecuado', () => {
    const profesor: Profesor = { 
      id: 1, 
      nombre: 'Juan Pérez', 
      rol: 'Profesor', 
      fechaNacimiento: new Date('1990-01-01'), 
      nacionalidad: 'Boliviana', 
      correo: 'juan.perez@example.com', 
      telefono: '123456789', 
      direccion: 'Av. Siempre Viva 742',
      ci: '7928722' 
    };
    spyOn(component, 'editarProfesor');

    component.editarProfesor(profesor);

    // Verificar que la función de edición fue llamada con el profesor correcto
    expect(component.editarProfesor).toHaveBeenCalledWith(profesor);
  });

  it('Debe devolver el id del profesor en trackById', () => {
    const profesor: Profesor = { 
      id: 1, 
      nombre: 'Juan Pérez', 
      rol: 'Profesor', 
      fechaNacimiento: new Date('1990-01-01'), 
      nacionalidad: 'Boliviana', 
      correo: 'juan.perez@example.com', 
      telefono: '123456789', 
      direccion: 'Av. Siempre Viva 742',
      ci: '7928722' 
    };
    const id = component.trackById(0, profesor);

    // Verificar que el id es devuelto correctamente
    expect(id).toBe(profesor.id);
  });
});
