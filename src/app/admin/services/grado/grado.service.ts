import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Grado } from '../../../core/interfaces/grado';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private apiUrl = 'https://tu-api.com/grados'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los grados
  getGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>(this.apiUrl);
  }

  // Crear un nuevo grado
  addGrado(grado: Grado): Observable<Grado> {
    return this.http.post<Grado>(this.apiUrl, grado);
  }

  // Actualizar un grado existente
  updateGrado(grado: Grado): Observable<Grado> {
    return this.http.put<Grado>(`${this.apiUrl}/${grado.id}`, grado);
  }

  // Eliminar un grado
  deleteGrado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getGradoById(id: number): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/${id}`);
  }
}