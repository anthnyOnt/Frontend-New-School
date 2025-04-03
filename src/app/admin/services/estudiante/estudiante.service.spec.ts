import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from '../../../core/interfaces/estudiante';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstudianteService]
    });

    service = TestBed.inject(EstudianteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya llamadas HTTP pendientes
  });

  const mockEstudiantes: Estudiante[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@email.com', ci: 1, fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria@email.com', ci: 2, fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' }
  ];

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('getEstudiantes()', () => {
    it('debería obtener estudiantes (mock)', (done) => {
      service.getEstudiantes().subscribe(estudiantes => {
        expect(estudiantes.length).toBe(4);
        expect(estudiantes).toEqual(service['mockEstudiantes']);
        done();
      });
    });

    it('debería hacer una petición GET cuando useMockData es false', () => {
      service['useMockData'] = false;
      service.getEstudiantes().subscribe();

      const req = httpMock.expectOne('http://api-estudiantes');
      expect(req.request.method).toBe('GET');
      req.flush(mockEstudiantes);
    });
  });

  describe('addEstudiante()', () => {
    it('debería agregar un estudiante (mock)', (done) => {
      const newEst: Estudiante = { id: 5, nombre: 'Luis', apellido: 'Ramírez', email: 'luis@email.com', ci: 5, fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' };

      service.addEstudiante(newEst).subscribe(est => {
        expect(est.id).toBeGreaterThan(0);
        expect(service['mockEstudiantes'].length).toBe(5);
        done();
      });
    });

    it('debería hacer una petición POST cuando useMockData es false', () => {
      service['useMockData'] = false;
      const newEst: Estudiante = { id: 3, nombre: 'Luis', apellido: 'Ramírez', email: 'luis@email.com', ci: 3, fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' };

      service.addEstudiante(newEst).subscribe();

      const req = httpMock.expectOne('http://api-estudiantes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEst);
      req.flush(newEst);
    });
  });

  describe('updateEstudiante()', () => {
    it('debería actualizar un estudiante (mock)', (done) => {
      const updatedEst: Estudiante = { ...mockEstudiantes[0], nombre: 'Juanito' };

      service.updateEstudiante(updatedEst).subscribe(est => {
        expect(est.nombre).toBe('Juanito');
        done();
      });
    });

    it('debería lanzar error si el estudiante no existe (mock)', (done) => {
      const invalidEst: Estudiante = { id: 99, nombre: 'Desconocido', apellido: 'Prueba', email: 'fake@email.com', ci: 99, fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' };

      service.updateEstudiante(invalidEst).subscribe({
        error: (err) => {
          expect(err.message).toContain('Estudiante con ID 99 no encontrado');
          done();
        }
      });
    });

    it('debería hacer una petición PUT cuando useMockData es false', () => {
      service['useMockData'] = false;
      const updatedEst: Estudiante = { ...mockEstudiantes[0], nombre: 'Juanito' };

      service.updateEstudiante(updatedEst).subscribe();

      const req = httpMock.expectOne(`http://api-estudiantes/${updatedEst.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedEst);
      req.flush(updatedEst);
    });
  });

  describe('deleteEstudiante()', () => {
    it('debería eliminar un estudiante (mock)', (done) => {
      service.deleteEstudiante(1).subscribe(() => {
        expect(service['mockEstudiantes'].find(e => e.id === 1)).toBeUndefined();
        done();
      });
    });

    it('debería lanzar error si el estudiante no existe (mock)', (done) => {
      service.deleteEstudiante(99).subscribe({
        error: (err) => {
          expect(err.message).toContain('Estudiante con ID 99 no encontrado');
          done();
        }
      });
    });

    it('debería hacer una petición DELETE cuando useMockData es false', () => {
      service['useMockData'] = false;

      service.deleteEstudiante(1).subscribe();

      const req = httpMock.expectOne(`http://api-estudiantes/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
