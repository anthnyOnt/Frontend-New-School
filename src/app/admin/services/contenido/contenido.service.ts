import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { Contenido } from '../../../core/interfaces/contenido';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private apiUrl = environment.apiUrl + '/contenidos'; // URL del backend
  
  constructor(private http: HttpClient) {}

  getContenidos(): Observable<Contenido[]> {

    return this.http.get<Contenido[]>(this.apiUrl);
  }

  getContenidosByCursoId(cursoId: number) {
    return this.http.get<Contenido[]>(`${this.apiUrl}?cursoId=${cursoId}`)
  }

  // Crear un nuevo contenido
  addContenido(contenido: Contenido): Observable<Contenido> {
    return this.http.post<Contenido>(this.apiUrl, contenido);
  }

  // Actualizar un contenido existente
  updateContenido(contenido: Contenido): Observable<Contenido> {
    return this.http.put<Contenido>(`${this.apiUrl}/${contenido.id}`, contenido);
  }

  // Eliminar un contenido
  deleteContenido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener un contenido por ID
  getContenidoById(id: number): Observable<Contenido> {
    return this.http.get<Contenido>(`${this.apiUrl}/${id}`);
  }

}