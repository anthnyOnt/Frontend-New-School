import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tarea } from '../../../core/interfaces/tarea';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = environment.apiUrl + '/tareas'; // URL del backend
  
  // Datos simulados (mock data)
  private mockTareas: Tarea[] = [
  ];

  // Flag para usar datos simulados
  private useMockData = false; // Cambiar a true para usar datos simulados

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

  getTareasByCursoId(cursoId: number): Observable<Tarea[]> {
    if (this.useMockData) {
      console.log('Obteniendo tareas simuladas por curso id', cursoId);
      const tareasFiltradas = this.mockTareas.filter(t => t.cursoId === cursoId);
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