import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Grado } from '../../../core/interfaces/grado';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private apiUrl = 'http://localhost:8080/api/v1/grados'; // URL del backend

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

  // Obtener un grado por ID
  getGradoById(id: number): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/${id}`);
  }

  // Método para alternar entre datos simulados y reales
  // Útil si en el futuro quieres probar con el backend real
  toggleMockData(useMock: boolean): void {
  }
}