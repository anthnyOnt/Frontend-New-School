import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Padre } from '../../../core/interfaces/padre';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PadreService {
  private apiUrl = environment.apiUrl + '/padres'; // URL del backend
  constructor(private http: HttpClient) {}

  addPadre(padre: Padre): Observable<Padre> {
    return this.http.post<Padre>(this.apiUrl + '/registro-completo', padre);
  }
  getPadres(): Observable<Padre[]> {
    return this.http.get<Padre[]>(this.apiUrl);
  }

  getPadreById(id: number): Observable<Padre> {
    return this.http.get<Padre>(`${this.apiUrl}/${id}`);
  }
  
  deletePadre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
