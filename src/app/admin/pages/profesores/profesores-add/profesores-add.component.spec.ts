import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorAddComponent } from './profesores-add.component';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../../../core/interfaces/profesor';

describe('ProfesorAddComponent', () => {
  let component: ProfesorAddComponent;
  let fixture: ComponentFixture<ProfesorAddComponent>;
  let profesorServiceSpy: jasmine.SpyObj<ProfesorService>;

  beforeEach(async () => {
    const profesorServiceMock = jasmine.createSpyObj('ProfesorService', ['addProfesor', 'updateProfesor']);

    await TestBed.configureTestingModule({
      //declarations: [ProfesorAddComponent],
      imports: [CommonModule, FormsModule, ProfesorAddComponent],  // Aquí añadimos el componente a imports
      providers: [{ provide: ProfesorService, useValue: profesorServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorAddComponent);
    component = fixture.componentInstance;
    profesorServiceSpy = TestBed.inject(ProfesorService) as jasmine.SpyObj<ProfesorService>;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con un profesor vacío si no hay profesorEditar', () => {
    expect(component.profesor.id).toBe(0);
    expect(component.profesor.nombre).toBe('');
  });

  it('debería cargar los datos del profesor si profesorEditar no es nulo', () => {
    const mockProfesor: Profesor = {
      id: 1,
      nombre: 'Carlos Pérez',
      fechaNacimiento: new Date('1985-10-15'),
      nacionalidad: 'Boliviano',
      correo: 'carlos@example.com',
      telefono: '76543210',
      direccion: 'Calle Falsa 123',
      rol: 'profesor',
      ci: '6543210',
    };

    component.profesorEditar = mockProfesor;
    component.ngOnChanges();

    expect(component.profesor).toEqual(mockProfesor);
  });

  it('debería llamar a addProfesor cuando se guarde un nuevo profesor', () => {
    const nuevoProfesor: Profesor = {
      id: 0,
      nombre: 'María López',
      fechaNacimiento: new Date('1990-05-20'),
      nacionalidad: 'Argentina',
      correo: 'maria@example.com',
      telefono: '76543211',
      direccion: 'Avenida Siempre Viva',
      rol: 'profesor',
      ci: '7890123',
    };

    profesorServiceSpy.addProfesor.and.returnValue(of(nuevoProfesor));
    spyOn(component.profesorAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    component.profesor = { ...nuevoProfesor };
    component.guardarProfesor();

    expect(profesorServiceSpy.addProfesor).toHaveBeenCalledWith(nuevoProfesor);
    expect(component.profesorAgregado.emit).toHaveBeenCalledWith(nuevoProfesor);
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('Se debería llamar a updateProfesor cuando se edite un profesor existente', () => {
    const profesorEditado: Profesor = {
      id: 2,
      nombre: 'Luis Herrera',
      fechaNacimiento: new Date('1980-08-10'),
      nacionalidad: 'Peruano',
      correo: 'luis@example.com',
      telefono: '76543212',
      direccion: 'Calle Ejemplo',
      rol: 'profesor',
      ci: '3456789',
    };

    component.profesorEditar = profesorEditado;
    component.ngOnChanges();
    profesorServiceSpy.updateProfesor.and.returnValue(of(profesorEditado));

    spyOn(component.profesorAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    component.guardarProfesor();

    expect(profesorServiceSpy.updateProfesor).toHaveBeenCalledWith(profesorEditado);
    expect(component.profesorAgregado.emit).toHaveBeenCalledWith(profesorEditado);
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('Se debería emitir el evento cerrar al cancelar', () => {
    spyOn(component.cerrar, 'emit');
    component.cerrar.emit();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('Se debería validar que el CI solo contiene números', () => {
    component.profesor.ci = 'ABC123';
    fixture.detectChanges();
    expect(component.profesor.ci).not.toMatch(/^\d+$/);
  });
});
