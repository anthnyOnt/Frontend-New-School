import { inject, Injectable } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = environment.apiUrl + '/cursos'
  private http = inject(HttpClient)

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Actualizar un Curso existente
  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  // Eliminar un Curso
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCursoByProfesor(profesorId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>('${this.apiUrl}/profesor/${profesorId}')
  }
}
