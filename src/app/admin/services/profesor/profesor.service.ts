import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Profesor } from '../../../core/interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'https://tu-api.com/profesores'; // URL del backend
  
  // Datos simulados (mock data)
  private mockProfesores: Profesor[] = [
    { id: 1, nombre: 'Juan Perez', fechaNacimiento: new Date(1980, 5, 15), nacionalidad: 'Argentina', correo: 'juan.perez@example.com', telefono: '123456789', direccion: 'Calle 123', rol: 'Profesor', ci: '12345678' },
    { id: 2, nombre: 'María López', fechaNacimiento: new Date(1975, 8, 23), nacionalidad: 'España', correo: 'maria.lopez@example.com', telefono: '987654321', direccion: 'Avenida 456', rol: 'Coordinador', ci: '23456789' },
    { id: 3, nombre: 'Carlos García', fechaNacimiento: new Date(1990, 2, 10), nacionalidad: 'México', correo: 'carlos.garcia@example.com', telefono: '456123789', direccion: 'Calle Falsa 789', rol: 'Docente', ci: '34567890' }
  ];
  private useMockData = true;

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    if(this.useMockData){
      console.log('Obteniendo profesores simulados');
      return of([...this.mockProfesores]).pipe(
        delay(500)
      )
    }
    return this.http.get<Profesor[]>(this.apiUrl)
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    if (this.useMockData) {
      console.log('Creando profesor simulado:',profesor);
      const newId = Math.max(...this.mockProfesores.map(p => p.id), 0) + 1;
      const newProfesor = {...profesor, id: newId};

      this.mockProfesores.push(newProfesor);

      return of(newProfesor).pipe(
        delay(500)
      )
    }
    return this.http.post<Profesor>(this.apiUrl, profesor);
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    if (this.useMockData) {
      console.log('Actualizando profesor simulado', profesor)
      const index = this.mockProfesores.findIndex(p => p.id === profesor.id);
      if (index === -1) {
        return throwError(() => new Error(`Profesor con ID ${profesor.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      this.mockProfesores[index] = { ...profesor }
      return of(this.mockProfesores[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Profesor>(`${this.apiUrl}/${profesor.id}`, profesor);
  }

  deleteProfesor(id: number): Observable<void> {
    if(this.useMockData) {
      console.log('Eliminando profesor simulado con ID:', id);
      const index = this.mockProfesores.findIndex(p=>p.id === id);

      if(index === -1) {
        return throwError(() => new Error(`Profesor con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }

      this.mockProfesores.splice(index, 1);
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProfesorById(id: number): Observable<Profesor> {
    if(this.useMockData) {
      console.log('Obteniendo profesor simulado con ID:', id);
      const profesor = this.mockProfesores.find(p => p.id === id);

      if(!profesor) {
        return throwError(() => new Error(`Profesor con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
    
      return of({...profesor}).pipe(
        delay(500)
      );
    }
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`);
  }

  toggleMockData(useMock: boolean):void {
    this.useMockData = useMock;
    console.log('Modo datos simulados:', this.useMockData ? 'ACTIVADO' : 'DESACTIVADO');
  }
}