import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TareaService } from './tarea.service';
import { Tarea } from '../../../core/interfaces/tarea';

describe('TareaService', () => {
  let service: TareaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TareaService]
    });
    service = TestBed.inject(TareaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock tareas when getTareas is called', (done) => {
    service.getTareas().subscribe(tareas => {
      expect(tareas.length).toBeGreaterThan(0);
      expect(tareas[0].titulo).toBeDefined();
      done();
    });
  });

  it('should filter tareas by curso_id', (done) => {
    const cursoId = 1;
    
    service.getTareasByCursoId(cursoId).subscribe(tareas => {
      expect(tareas.length).toBeGreaterThan(0);
      expect(tareas.every(tarea => tarea.curso_id === cursoId)).toBe(true);
      done();
    });
  });

  it('should add a new tarea', (done) => {
    const newTarea: Tarea = {
      id: 0,
      titulo: 'Nueva Tarea',
      descripcion: 'Descripción de la nueva tarea',
      fecha_entrega: new Date(),
      puntaje_max: 10,
      curso_id: 1
    };

    service.addTarea(newTarea).subscribe(tarea => {
      expect(tarea.id).toBeGreaterThan(0);
      expect(tarea.titulo).toBe('Nueva Tarea');
      done();
    });
  });

  it('should update an existing tarea', (done) => {
    // First get a tarea to update
    service.getTareas().subscribe(tareas => {
      const tareaToUpdate = { ...tareas[0], titulo: 'Título Actualizado' };
      
      service.updateTarea(tareaToUpdate).subscribe(updatedTarea => {
        expect(updatedTarea.id).toBe(tareaToUpdate.id);
        expect(updatedTarea.titulo).toBe('Título Actualizado');
        done();
      });
    });
  });

  it('should delete a tarea', (done) => {
    // First get a tarea to delete
    service.getTareas().subscribe(tareas => {
      const tareaId = tareas[0].id;
      
      service.deleteTarea(tareaId).subscribe(() => {
        // After deletion, the tarea should no longer exist
        service.getTareaById(tareaId).subscribe(
          () => {
            // Should not reach here
            fail('Tarea should not exist');
          },
          error => {
            expect(error).toBeTruthy();
            done();
          }
        );
      });
    });
  });
});