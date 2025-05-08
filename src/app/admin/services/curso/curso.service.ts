import { inject, Injectable } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { Estudiante } from '../../../core/interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/v1/cursos';
  private http = inject(HttpClient)

  private mockCursos: Array<Curso> = [
    {id: 1, nombre: 'Fisica', descripcion: 'Curso de fisica', fechaCreacion: new Date(2024, 2, 14), profesorId: 1, gradoId: 1},
    {id: 2, nombre: 'Quimica', descripcion: 'Curso de quimica', fechaCreacion: new Date(2024, 2, 14), profesorId: 1, gradoId: 2},
    {id: 3, nombre: 'Matematica', descripcion: 'Curso de matematica', fechaCreacion: new Date(2024, 2, 14), profesorId: 2, gradoId: 3},
    ]
  
  private useMockData = false;

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

  getCursoById(id: number): Observable<Curso> {
    if (this.useMockData) {
      console.log('Obteniendo curso simulado con ID:', id);
      // Buscar el curso por ID
      const curso = this.mockCursos.find(c => c.id === id);
      
      // Si no existe, retornar error
      if (!curso) {
        return throwError(() => new Error(`Curso con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Retornar observable con el grado encontrado
      return of({...curso}).pipe(
        delay(500)
      );
    }
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
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

  getCursoByProfesor(profesorId: number): Observable<Curso[]> {
    if (this.useMockData) {
      const cursosFiltrados = this.mockCursos.filter(curso => curso.profesorId === profesorId);
      return of(cursosFiltrados).pipe(
        delay(500)
      );
    }
    return this.http.get<Curso[]>('${this.apiUrl}/profesor/${profesorId}')
  }

  getCursoByGrado(gradoId: number): Observable<Curso[]> {

    return this.http.get<Curso[]>('${this.apiUrl}/grado/${gradoId}')
  }
}
