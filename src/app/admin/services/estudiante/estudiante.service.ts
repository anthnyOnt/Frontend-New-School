import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError} from 'rxjs';
import { Estudiante } from '../../../core/interfaces/estudiante';
import { usuario } from '../../../core/interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/v1/estudiante';
  private http = inject(HttpClient);

  // private mockEstudiantes: Estudiante[] = [
  //   { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@email.com', ci: 1, fecha_nacimiento: '1990-01-01' , password: '123456', rol: 'estudiante' },
  //   { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria@email.com', ci: 2, fecha_nacimiento: '1990-01-01' , password: '123456', rol: 'estudiante' },
  //   { id: 3, nombre: 'Pedro', apellido: 'Martínez', email: 'pedro@email.com', ci: 3, fecha_nacimiento: '1990-01-01' , password: '1234556', rol: 'estudiante' },
  //   { id: 4, nombre: 'Ana', apellido: 'García', email: 'ana@email.com', ci: 4 , fecha_nacimiento: '1990-01-01', password: '123456', rol: 'estudiante' },  
  // ]

  private useMockData = false;

  getEstudiantes(): Observable<Estudiante[]> {
    // if (this.useMockData) {
    //   // Simulamos un retraso de red (500ms)
    //   console.log('Obteniendo Estudiantes simulados');
    //   return of([...this.mockEstudiantes]).pipe(
    //     delay(500)
    //   );
    // }
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  addEstudiante(est: Estudiante): Observable<Estudiante> {
    // if (this.useMockData) {
    //   console.log('Creando estudiante simulado:', est);
    //   // Generar un nuevo ID (el mayor + 1)
    //   const newId = Math.max(...this.mockEstudiantes.map(g => g.id), 0) + 1;
    //   const newEst = { ...est, id: newId };
      

    //   this.mockEstudiantes.push(newEst);

    //   return of(newEst).pipe(
    //     delay(500)
    //   );
    // }
    return this.http.post<Estudiante>(this.apiUrl + '/registro-completo', est);
  }

  // Actualizar un Estudiante existente
  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    // if (this.useMockData) {
    //   console.log('Actualizando Estudiante simulado:', estudiante);
    //   // Buscar el índice del Estudiante a actualizar
    //   const index = this.mockEstudiantes.findIndex(g => g.id === estudiante.id);
      
    //   // Si no existe, retornar error
    //   if (index === -1) {
    //     return throwError(() => new Error(`Estudiante con ID ${estudiante.id} no encontrado`)).pipe(
    //       delay(500)
    //     );
    //   }
      
    //   // Actualizar el Estudiante en la lista simulada
    //   this.mockEstudiantes[index] = { ...estudiante };
      
    //   // Retornar observable con el Estudiante actualizado
    //   return of(this.mockEstudiantes[index]).pipe(
    //     delay(500)
    //   );
    // }
    return this.http.put<Estudiante>(`${this.apiUrl}/${estudiante.id}`, estudiante);
  }

  // Eliminar un Estudiante
  deleteEstudiante(id: number): Observable<void> {
    // if (this.useMockData) {
    //   console.log('Eliminando Estudiante simulado con ID:', id);
    //   // Buscar el índice del Estudiante a eliminar
    //   const index = this.mockEstudiantes.findIndex(g => g.id === id);
      
    //   // Si no existe, retornar error
    //   if (index === -1) {
    //     return throwError(() => new Error(`Estudiante con ID ${id} no encontrado`)).pipe(
    //       delay(500)
    //     );
    //   }
      
    //   // Eliminar el Estudiante de la lista simulada
    //   this.mockEstudiantes.splice(index, 1);
      
    //   // Retornar observable vacío (void)
    //   return of(void 0).pipe(
    //     delay(500)
    //   );
    // }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}