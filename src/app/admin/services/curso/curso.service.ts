import { inject, Injectable } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://api-cursos';
  private http = inject(HttpClient)

  private mockCursos: Array<Curso> = [
    {id: 1, nombre: 'Fisica', descripcion: 'Curso de fisica', fechaCreacion: new Date(2024, 2, 14), gradoId: 1},
    {id: 2, nombre: 'Quimica', descripcion: 'Curso de quimica', fechaCreacion: new Date(2024, 2, 14),  gradoId: 2},
    {id: 3, nombre: 'Matematica', descripcion: 'Curso de matematica', fechaCreacion: new Date(2024, 2, 14),  gradoId: 3},
    ]
  
  private useMockData = true;

  getCursos(): Observable<Curso[]> {
    if (this.useMockData) {
      // Simulamos un retraso de red (500ms)
      console.log('Obteniendo Cursos simulados');
      return of([...this.mockCursos]).pipe(
        delay(500)
      );
    }
    return this.http.get<Curso[]>(this.apiUrl);
  }

  addCurso(curso: Curso): Observable<Curso> {
    if (this.useMockData) {
      console.log('Creando Curso simulado:', curso);
      // Generar un nuevo ID (el mayor + 1)
      const newId = Math.max(...this.mockCursos.map(g => g.id), 0) + 1;
      const newCurso = { ...curso, id: newId };
      

      this.mockCursos.push(newCurso);

      return of(newCurso).pipe(
        delay(500)
      );
    }
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Actualizar un Curso existente
  updateCurso(curso: Curso): Observable<Curso> {
    if (this.useMockData) {
      console.log('Actualizando Curso simulado:', curso);
      // Buscar el índice del Curso a actualizar
      const index = this.mockCursos.findIndex(g => g.id === curso.id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Curso con ID ${curso.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Actualizar el Curso en la lista simulada
      this.mockCursos[index] = { ...curso };
      
      // Retornar observable con el Curso actualizado
      return of(this.mockCursos[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  // Eliminar un Curso
  deleteCurso(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando Curso simulado con ID:', id);
      // Buscar el índice del Curso a eliminar
      const index = this.mockCursos.findIndex(g => g.id === id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Curso con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Eliminar el Curso de la lista simulada
      this.mockCursos.splice(index, 1);
      
      // Retornar observable vacío (void)
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
