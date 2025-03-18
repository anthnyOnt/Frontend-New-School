import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Grado } from '../../../core/interfaces/grado';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private apiUrl = 'https://tu-api.com/grados'; // URL del backend
  
  // Datos simulados (mock data)
  private mockGrados: Grado[] = [
    { id: 1, descripcion: 'Primer Grado', primaria_secundaria: true },
    { id: 2, descripcion: 'Segundo Grado', primaria_secundaria: true },
    { id: 3, descripcion: 'Tercer Grado', primaria_secundaria: true },
    { id: 4, descripcion: 'Cuarto Grado', primaria_secundaria: true },
    { id: 5, descripcion: 'Quinto Grado', primaria_secundaria: true },
    { id: 6, descripcion: 'Sexto Grado', primaria_secundaria: true },
    { id: 7, descripcion: 'Primer Año', primaria_secundaria: false },
    { id: 8, descripcion: 'Segundo Año', primaria_secundaria: false },
    { id: 9, descripcion: 'Tercer Año', primaria_secundaria: false },
    { id: 10, descripcion: 'Cuarto Año', primaria_secundaria: false },
    { id: 11, descripcion: 'Quinto Año', primaria_secundaria: false }
  ];

  // Flag para usar datos simulados
  private useMockData = true;

  constructor(private http: HttpClient) {}

  // Obtener todos los grados
  getGrados(): Observable<Grado[]> {
    if (this.useMockData) {
      // Simulamos un retraso de red (500ms)
      console.log('Obteniendo grados simulados');
      return of([...this.mockGrados]).pipe(
        delay(500)
      );
    }
    return this.http.get<Grado[]>(this.apiUrl);
  }

  // Crear un nuevo grado
  addGrado(grado: Grado): Observable<Grado> {
    if (this.useMockData) {
      console.log('Creando grado simulado:', grado);
      // Generar un nuevo ID (el mayor + 1)
      const newId = Math.max(...this.mockGrados.map(g => g.id), 0) + 1;
      const newGrado = { ...grado, id: newId };
      
      // Agregar a la lista simulada
      this.mockGrados.push(newGrado);
      
      // Retornar observable con el nuevo grado
      return of(newGrado).pipe(
        delay(500)
      );
    }
    return this.http.post<Grado>(this.apiUrl, grado);
  }

  // Actualizar un grado existente
  updateGrado(grado: Grado): Observable<Grado> {
    if (this.useMockData) {
      console.log('Actualizando grado simulado:', grado);
      // Buscar el índice del grado a actualizar
      const index = this.mockGrados.findIndex(g => g.id === grado.id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Grado con ID ${grado.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Actualizar el grado en la lista simulada
      this.mockGrados[index] = { ...grado };
      
      // Retornar observable con el grado actualizado
      return of(this.mockGrados[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Grado>(`${this.apiUrl}/${grado.id}`, grado);
  }

  // Eliminar un grado
  deleteGrado(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando grado simulado con ID:', id);
      // Buscar el índice del grado a eliminar
      const index = this.mockGrados.findIndex(g => g.id === id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Grado con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Eliminar el grado de la lista simulada
      this.mockGrados.splice(index, 1);
      
      // Retornar observable vacío (void)
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener un grado por ID
  getGradoById(id: number): Observable<Grado> {
    if (this.useMockData) {
      console.log('Obteniendo grado simulado con ID:', id);
      // Buscar el grado por ID
      const grado = this.mockGrados.find(g => g.id === id);
      
      // Si no existe, retornar error
      if (!grado) {
        return throwError(() => new Error(`Grado con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Retornar observable con el grado encontrado
      return of({...grado}).pipe(
        delay(500)
      );
    }
    return this.http.get<Grado>(`${this.apiUrl}/${id}`);
  }

  // Método para alternar entre datos simulados y reales
  // Útil si en el futuro quieres probar con el backend real
  toggleMockData(useMock: boolean): void {
    this.useMockData = useMock;
    console.log('Modo datos simulados:', this.useMockData ? 'ACTIVADO' : 'DESACTIVADO');
  }
}