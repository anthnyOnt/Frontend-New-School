import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { Inscripcion } from '../../../core/interfaces/inscripcion';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = environment.apiUrl + '/inscripciones';
  private http = inject(HttpClient)

  private mockInscripciones: Array<Inscripcion> = []
  
  private useMockData = false;

  getInscripciones(): Observable<Inscripcion[]> {
    if (this.useMockData) {
      // Simulamos un retraso de red (500ms)
      console.log('Obteniendo Inscripciones simulados');
      return of([...this.mockInscripciones]).pipe(
        delay(500)
      );
    }
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcionById(id: number): Observable<Inscripcion> {
    if (this.useMockData) {
      console.log('Obteniendo inscripcion simulado con ID:', id);
      // Buscar el inscripcion por ID
      const inscripcion = this.mockInscripciones.find(i => i.id === id);
      
      // Si no existe, retornar error
      if (!inscripcion) {
        return throwError(() => new Error(`inscripcion con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Retornar observable con el grado encontrado
      return of({...inscripcion}).pipe(
        delay(500)
      );
    }
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    if (this.useMockData) {
      console.log('Creando inscripcion simulado:', inscripcion);
      // Generar un nuevo ID (el mayor + 1)
      const newId = Math.max(...this.mockInscripciones.map(i => i.id), 0) + 1;
      const newInscripcion = { ...inscripcion, id: newId };
      

      this.mockInscripciones.push(newInscripcion);

      return of(newInscripcion).pipe(
        delay(500)
      );
    }
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  // Actualizar un inscripcion existente
  updateInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    if (this.useMockData) {
      console.log('Actualizando inscripcion simulado:', inscripcion);
      // Buscar el índice del inscripcion a actualizar
      const index = this.mockInscripciones.findIndex(g => g.id === inscripcion.id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`inscripcion con ID ${inscripcion.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Actualizar el Curso en la lista simulada
      this.mockInscripciones[index] = { ...inscripcion };
      
      // Retornar observable con el Curso actualizado
      return of(this.mockInscripciones[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Inscripcion>(`${this.apiUrl}/${inscripcion.id}`, inscripcion);
  }

  // Eliminar un Curso
  deleteInscripcion(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando Curso simulado con ID:', id);
      // Buscar el índice del inscripcion a eliminar
      const index = this.mockInscripciones.findIndex(i => i.id === id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Curso con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Eliminar el inscripcion de la lista simulada
      this.mockInscripciones.splice(index, 1);
      
      // Retornar observable vacío (void)
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getInscripcionByEstudianteId(estudianteId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
  }
  
  getInscripcionesByGradoId(gradoId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/grado/${gradoId}`);
  }

}