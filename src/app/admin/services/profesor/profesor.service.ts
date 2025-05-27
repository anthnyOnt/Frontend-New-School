import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Profesor } from '../../../core/interfaces/profesor';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = environment.apiUrl + '/docentes'; // URL del backend

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl)
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl + '/registro-completo', profesor);
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${profesor.id}`, profesor);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProfesorById(userId: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/usuario/${userId}`);
  }
}