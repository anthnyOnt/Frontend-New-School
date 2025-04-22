import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tarea } from '../../../core/interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://tu-api.com/tareas'; // URL del backend
  
  // Datos simulados (mock data)
  private mockTareas: Tarea[] = [
    {
      id: 1,
      titulo: "Ejercicios de Álgebra",
      descripcion: "Resolver los problemas 1-10 del capítulo 3 del libro de texto.",
      fecha_entrega: new Date("2025-05-10"),
      puntaje_max: 20,
      curso_id: 1 // Matemáticas
    },
    {
      id: 2,
      titulo: "Ensayo sobre Movimiento Rectilíneo",
      descripcion: "Escribir un ensayo de 500 palabras explicando el movimiento rectilíneo uniforme y sus aplicaciones.",
      fecha_entrega: new Date("2025-05-15"),
      puntaje_max: 30,
      curso_id: 2 // Física
    },
    {
      id: 3,
      titulo: "Proyecto de JavaScript",
      descripcion: "Crear una pequeña aplicación web utilizando lo aprendido sobre DOM y eventos.",
      fecha_entrega: new Date("2025-05-20"),
      puntaje_max: 50,
      curso_id: 3 // Programación
    },
    {
      id: 4,
      titulo: "Quiz de Funciones",
      descripcion: "Prepararse para el quiz sobre funciones matemáticas y sus gráficos.",
      fecha_entrega: new Date("2025-05-05"),
      puntaje_max: 15,
      curso_id: 1 // Matemáticas
    },
    {
      id: 5,
      titulo: "Informe de Laboratorio",
      descripcion: "Elaborar un informe sobre el experimento de caída libre realizado en clase.",
      fecha_entrega: new Date("2025-05-18"),
      puntaje_max: 40,
      curso_id: 2 // Física
    }
  ];

  // Flag para usar datos simulados
  private useMockData = true;

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTareas(): Observable<Tarea[]> {
    if (this.useMockData) {
      console.log('Obteniendo tareas simuladas');
      return of([...this.mockTareas]).pipe(
        delay(500)
      );
    }
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Obtener tareas por curso ID
  getTareasByCursoId(cursoId: number): Observable<Tarea[]> {
    if (this.useMockData) {
      console.log('Obteniendo tareas simuladas por curso id', cursoId);
      const tareasFiltradas = this.mockTareas.filter(t => t.curso_id === cursoId);
      return of(tareasFiltradas).pipe(
        delay(500)
      );
    }
    return this.http.get<Tarea[]>(`${this.apiUrl}/curso/${cursoId}`);
  }

  // Crear una nueva tarea
  addTarea(tarea: Tarea): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Creando tarea simulada:', tarea);
      const newId = Math.max(...this.mockTareas.map(t => t.id), 0) + 1;
      const newTarea = { ...tarea, id: newId };
      
      this.mockTareas.push(newTarea);
      
      return of(newTarea).pipe(
        delay(500)
      );
    }
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  // Actualizar una tarea existente
  updateTarea(tarea: Tarea): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Actualizando tarea simulada:', tarea);
      const index = this.mockTareas.findIndex(t => t.id === tarea.id);
      
      if (index === -1) {
        return throwError(() => new Error(`Tarea con ID ${tarea.id} no encontrada`)).pipe(
          delay(500)
        );
      }
      
      this.mockTareas[index] = { ...tarea };
      
      return of(this.mockTareas[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }

  // Eliminar una tarea
  deleteTarea(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando tarea simulada con ID:', id);
      const index = this.mockTareas.findIndex(t => t.id === id);
      
      if (index === -1) {
        return throwError(() => new Error(`Tarea con ID ${id} no encontrada`)).pipe(
          delay(500)
        );
      }
      
      this.mockTareas.splice(index, 1);
      
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener una tarea por ID
  getTareaById(id: number): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Obteniendo tarea simulada con ID:', id);
      const tarea = this.mockTareas.find(t => t.id === id);
      
      if (!tarea) {
        return throwError(() => new Error(`Tarea con ID ${id} no encontrada`)).pipe(
          delay(500)
        );
      }
      
      return of({...tarea}).pipe(
        delay(500)
      );
    }
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  // Método para alternar entre datos simulados y reales
  toggleMockData(useMock: boolean): void {
    this.useMockData = useMock;
    console.log('Modo datos simulados:', this.useMockData ? 'ACTIVADO' : 'DESACTIVADO');
  }
}