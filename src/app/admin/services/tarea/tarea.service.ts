import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Tarea } from '../../../core/interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://tu-api.com/Tareas'; // URL del backend
  
  // Datos simulados (mock data)
  private mockTareas: Tarea[] = [
    {id: 1, titulo: "Tarea 1", descripcion: "Instruccion de la tarea 1", fecha_entrega: new Date(), puntaje_max: 100, curso_id: 1},
    {id: 2, titulo: "Tarea 2", descripcion: "Instruccion de la tarea 2", fecha_entrega: new Date(), puntaje_max: 100, curso_id: 2},
    {id: 3, titulo: "Tarea 3", descripcion: "Instruccion de la tarea 3", fecha_entrega: new Date(), puntaje_max: 100, curso_id: 3},
  ];

  // Flag para usar datos simulados
  private useMockData = true;

  constructor(private http: HttpClient) {}

  // Obtener todos los Tareas
  getTareas(): Observable<Tarea[]> {
    if (this.useMockData) {
      // Simulamos un retraso de red (500ms)
      console.log('Obteniendo Tareas simulados');
      return of([...this.mockTareas]).pipe(
        delay(500)
      );
    }
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Crear un nuevo Tarea
  addTarea(tarea: Tarea): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Creando Tarea simulado:', tarea);
      // Generar un nuevo ID (el mayor + 1)
      const newId = Math.max(...this.mockTareas.map(t => t.id), 0) + 1;
      const newTarea = { ...tarea, id: newId };
      
      // Agregar a la lista simulada
      this.mockTareas.push(newTarea);
      
      // Retornar observable con el nuevo Tarea
      return of(newTarea).pipe(
        delay(500)
      );
    }
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  // Actualizar un Tarea existente
  updateTarea(tarea: Tarea): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Actualizando Tarea simulado:', tarea);
      // Buscar el índice del Tarea a actualizar
      const index = this.mockTareas.findIndex(t => t.id === tarea.id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Tarea con ID ${tarea.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Actualizar el Tarea en la lista simulada
      this.mockTareas[index] = { ...tarea };
      
      // Retornar observable con el Tarea actualizado
      return of(this.mockTareas[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
  
  // Eliminar un Tarea
  deleteTarea(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando Tarea simulado con ID:', id);
      // Buscar el índice del Tarea a eliminar
      const index = this.mockTareas.findIndex(g => g.id === id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Tarea con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Eliminar el Tarea de la lista simulada
      this.mockTareas.splice(index, 1);
      
      // Retornar observable vacío (void)
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener un Tarea por ID
  getTareaById(id: number): Observable<Tarea> {
    if (this.useMockData) {
      console.log('Obteniendo Tarea simulado con ID:', id);
      // Buscar el Tarea por ID
      const Tarea = this.mockTareas.find(g => g.id === id);
      
      // Si no existe, retornar error
      if (!Tarea) {
        return throwError(() => new Error(`Tarea con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Retornar observable con el Tarea encontrado
      return of({...Tarea}).pipe(
        delay(500)
      );
    }
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  // getTareasByEstudiante(estudianteId: number): Observable<Tarea> {
  //   return
  // }
}