import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfesorService } from './profesor.service';
import { Profesor } from '../../../core/interfaces/profesor';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let httpMock: HttpTestingController;

  const mockProfesores: Profesor[] = [
    { id: 1, nombre: 'Juan Perez', fechaNacimiento: new Date(1980, 5, 15), nacionalidad: 'Argentina', correo: 'juan.perez@example.com', telefono: '123456789', direccion: 'Calle 123', rol: 'Profesor', ci: '12345678' },
    { id: 2, nombre: 'María López', fechaNacimiento: new Date(1975, 8, 23), nacionalidad: 'España', correo: 'maria.lopez@example.com', telefono: '987654321', direccion: 'Avenida 456', rol: 'Coordinador', ci: '23456789' },
    { id: 3, nombre: 'Carlos García', fechaNacimiento: new Date(1990, 2, 10), nacionalidad: 'México', correo: 'carlos.garcia@example.com', telefono: '456123789', direccion: 'Calle Falsa 789', rol: 'Docente', ci: '34567890' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfesorService]
    });

    service = TestBed.inject(ProfesorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no haya solicitudes pendientes.
  });

  it('Debe ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe obtener los profesores simulados', () => {
    service.toggleMockData(true); // Asegurarse de que los datos simulados estén activos

    service.getProfesores().subscribe(profesores => {
      expect(profesores.length).toBe(3);
      expect(profesores).toEqual(mockProfesores);
    });

    // No se hace llamada HTTP real debido a los datos simulados
  });

  it('Debe agregar un nuevo profesor simulado', () => {
    service.toggleMockData(true); // Asegurarse de que los datos simulados estén activos

    const newProfesor: Profesor = { 
      id: 4, nombre: 'Pedro Fernández', fechaNacimiento: new Date(1985, 3, 10), nacionalidad: 'Boliviana', correo: 'pedro.fernandez@example.com', telefono: '654321987', direccion: 'Calle Principal 741', rol: 'Profesor', ci: '45678901' 
    };

    service.addProfesor(newProfesor).subscribe(profesor => {
      expect(profesor).toEqual({ ...newProfesor, id: 4 }); // El ID será generado
    });
  });

  it('Debe actualizar un profesor simulado', () => {
    service.toggleMockData(true); // Asegurarse de que los datos simulados estén activos

    const updatedProfesor: Profesor = { 
      id: 2, nombre: 'María López Actualizada', fechaNacimiento: new Date(1975, 8, 23), nacionalidad: 'España', correo: 'maria.lopez.updated@example.com', telefono: '987654321', direccion: 'Avenida 789', rol: 'Coordinador', ci: '23456789' 
    };

    service.updateProfesor(updatedProfesor).subscribe(profesor => {
      expect(profesor).toEqual(updatedProfesor);
    });
  });

  it('Debe eliminar un profesor simulado', () => {
    service.toggleMockData(true); // Asegurarse de que los datos simulados estén activos

    const profesorId = 3;

    service.deleteProfesor(profesorId).subscribe(() => {
      // Comprobar que el profesor con id 3 ha sido eliminado
      expect(service['mockProfesores'].find(p => p.id === profesorId)).toBeUndefined();
    });
  });

  it('Debe obtener un profesor por ID simulado', () => {
    service.toggleMockData(true); // Asegurarse de que los datos simulados estén activos

    const profesorId = 2;
    service.getProfesorById(profesorId).subscribe(profesor => {
      expect(profesor).toEqual(mockProfesores[1]); // Profesor con id 2
    });
  });

  it('Debe lanzar un error al intentar obtener un profesor que no existe', (done) => {
    service.toggleMockData(true); // Asegurar que los datos simulados estén activos
  
    const profesorId = 999; // Profesor que no existe
    service.getProfesorById(profesorId).subscribe({
      next: () => fail('Se esperaba un error'),
      error: (err) => {
        expect(err.message).toContain(`Profesor con ID ${profesorId} no encontrado`);
        done(); // Indicar que la prueba ha terminado
      }
    });
  });
  
  it('Debe devolver un error al intentar eliminar un profesor que no existe', (done) => {
    service.toggleMockData(true); // Asegurar que los datos simulados estén activos
  
    const profesorId = 999; // Profesor que no existe
    service.deleteProfesor(profesorId).subscribe({
      next: () => fail('Se esperaba un error'),
      error: (err) => {
        expect(err.message).toContain(`Profesor con ID ${profesorId} no encontrado`);
        done(); // Indicar que la prueba ha terminado
      }
    });
  });  
});