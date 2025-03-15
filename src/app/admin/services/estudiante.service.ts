import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../../core/interfaces/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = 'http://api-estudiantes';
  private http = inject(HttpClient);

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}