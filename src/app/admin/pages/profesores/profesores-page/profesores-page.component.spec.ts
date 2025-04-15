import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProfesoresPageComponent } from './profesores-page.component';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Profesor } from '../../../../core/interfaces/profesor';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('ProfesoresPageComponent', () => {
  let component: ProfesoresPageComponent;
  let fixture: ComponentFixture<ProfesoresPageComponent>;
  let profesorService: jasmine.SpyObj<ProfesorService>;

  // Datos simulados de profesores
  const mockProfesores: Profesor[] = [
    {
      id: 1,
      nombre: 'Carlos Pérez',
      fechaNacimiento: new Date('1985-10-15'),
      nacionalidad: 'Boliviano',
      correo: 'carlos@example.com',
      telefono: '76543210',
      direccion: 'Calle Falsa 123',
      rol: 'profesor',
      ci: '6543210',
    },
    {
      id: 2,
      nombre: 'María López',
      fechaNacimiento: new Date('1990-05-22'),
      nacionalidad: 'Argentina',
      correo: 'maria@example.com',
      telefono: '71234567',
      direccion: 'Av. Principal 456',
      rol: 'profesor',
      ci: '9876543',
    },
    {
      id: 3,
      nombre: 'Pedro Martínez',
      fechaNacimiento: new Date('1978-12-03'),
      nacionalidad: 'Chileno',
      correo: 'pedro@example.com',
      telefono: '72345678',
      direccion: 'Zona Sur 789',
      rol: 'coordinador',
      ci: '1234567',
    }
  ];

  beforeEach(async () => {
    const profesorServiceSpy = jasmine.createSpyObj('ProfesorService', [
      'getProfesores',
      'deleteProfesor'
    ]);

    await TestBed.configureTestingModule({
      //declarations: [ProfesoresPageComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, CommonModule],
      providers: [{ provide: ProfesorService, useValue: profesorServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesoresPageComponent);
    component = fixture.componentInstance;
    profesorService = TestBed.inject(ProfesorService) as jasmine.SpyObj<ProfesorService>;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los profesores correctamente', () => {
    profesorService.getProfesores.and.returnValue(of(mockProfesores));
    component.cargarProfesores();
    expect(component.profesores).toEqual(mockProfesores);
    expect(component.profesoresFiltrados).toEqual(mockProfesores);
  });

  it('Debe manejar error al cargar profesores', () => {
    profesorService.getProfesores.and.returnValue(throwError(() => new Error('Error en la carga')));
    component.cargarProfesores();
    expect(component.error).toBe('No se pudieron cargar los profesores. Por favor, intente nuevamente.');
  });

  it('Debe filtrar profesores correctamente por nacionalidad', () => {
    component.profesores = mockProfesores;
    component.terminoBusqueda = 'Argentina';
    component.filtrarProfesores();
    expect(component.profesoresFiltrados.length).toBe(1);
    expect(component.profesoresFiltrados[0].nacionalidad).toBe('Argentina');
  });

  it('Debe establecer el profesor a editar y mostrar el formulario', () => {
    const profesor = mockProfesores[0];
    component.editarProfesor(profesor);
    expect(component.profesorEditar).toEqual(profesor);
    expect(component.mostrarFormulario).toBeTrue();
  });

  it('Debe abrir el formulario correctamente', () => {
    component.abrirFormulario();
    expect(component.profesorEditar).toBeNull();
    expect(component.mostrarFormulario).toBeTrue();
  });

  it('Debe cerrar el formulario correctamente', () => {
    component.cerrarFormulario();
    expect(component.profesorEditar).toBeNull();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('Debe recargar la lista de profesores al agregar uno nuevo', () => {
    spyOn(component, 'cargarProfesores');
    component.agregarNuevoProfesor(mockProfesores[0]);
    expect(component.cargarProfesores).toHaveBeenCalled();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('Debe eliminar un profesor y recargar la lista', () => {
    profesorService.deleteProfesor.and.returnValue(of(void 0));
    spyOn(component, 'cargarProfesores');
    component.manejarProfesorEliminado(1);
    expect(profesorService.deleteProfesor).toHaveBeenCalledWith(1);
    expect(component.cargarProfesores).toHaveBeenCalled();
  });

  it('Debe manejar error al eliminar un profesor', () => {
    spyOn(console, 'error');
    profesorService.deleteProfesor.and.returnValue(throwError(() => new Error('Error eliminando profesor')));
    component.manejarProfesorEliminado(1);
    expect(console.error).toHaveBeenCalledWith('Error al eliminar el profesor:', jasmine.any(Error));
  });

  it('Debe devolver el ID del profesor en trackById', () => {
    const result = component.trackById(0, mockProfesores[0]);
    expect(result).toBe(1);
  });
});
