import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { Contenido } from '../../../core/interfaces/contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private apiUrl = 'https://tu-api.com/contenidos'; // URL del backend
  
  // Datos simulados (mock data)
  private mockContenidos: Contenido[] = [
    {
        id: 1,
        titulo: "Números Enteros y Operaciones",
        descripcion: "Video explicativo sobre sumas, restas, multiplicaciones y divisiones con números enteros.",
        tipo: "video",
        url: "https://www.youtube.com/watch?v=numeros_enteros",
        creacion: new Date("2024-03-01"),
        curso_id: 1 // Matemáticas
    },
    {
        id: 2,
        titulo: "Ejercicios de Fracciones",
        descripcion: "Documento PDF con ejercicios de suma, resta y multiplicación de fracciones.",
        tipo: "documento",
        url: "https://example.com/matematicas/fracciones.pdf",
        creacion: new Date("2024-03-05"),
        curso_id: 2
    },
    {
        id: 3,
        titulo: "Geometría Básica",
        descripcion: "Artículo explicativo sobre figuras geométricas y sus propiedades.",
        tipo: "articulo",
        url: "https://example.com/matematicas/geometria",
        creacion: new Date("2024-03-07"),
        curso_id: 3
    },
    {
      id: 4,
      titulo: "Geometría analítica",
      descripcion: "Video explicativo sobre geometría analítica y sus aplicaciones.",
      tipo: "video",
      url: "https://example.com/matematicas/geometria",
      creacion: new Date("2024-03-07"),
      curso_id: 3
  },
  ];


  // Flag para usar datos simulados
  private useMockData = true;

  constructor(private http: HttpClient) {}

  // Obtener todos los contenidos
  getContenidos(): Observable<Contenido[]> {
    if (this.useMockData) {
      // Simulamos un retraso de red (500ms)
      console.log('Obteniendo contenidos simulados');
      return of([...this.mockContenidos]).pipe(
        delay(500)
      );
    }
    return this.http.get<Contenido[]>(this.apiUrl);
  }

  getContenidosByCursoId(cursoId: number) {
    if(this.useMockData){
      console.log('Obteniendo contenidos simulados por curso id', cursoId)
      const contenidosFiltrados = this.mockContenidos.filter(c => c.curso_id === cursoId)
      return of(contenidosFiltrados).pipe(
        delay(500)
      )
    }
    return this.http.get<Contenido[]>(`${this.apiUrl}?cursoId=${cursoId}`)
  }

  // Crear un nuevo contenido
  addContenido(contenido: Contenido): Observable<Contenido> {
    if (this.useMockData) {
      console.log('Creando contenido simulado:', contenido);
      // Generar un nuevo ID (el mayor + 1)
      const newId = Math.max(...this.mockContenidos.map(c => c.id), 0) + 1;
      const newContenido = { ...contenido, id: newId };
      
      // Agregar a la lista simulada
      this.mockContenidos.push(newContenido);
      
      // Retornar observable con el nuevo contenido
      return of(newContenido).pipe(
        delay(500)
      );
    }
    return this.http.post<Contenido>(this.apiUrl, contenido);
  }

  // Actualizar un contenido existente
  updateContenido(contenido: Contenido): Observable<Contenido> {
    if (this.useMockData) {
      console.log('Actualizando contenido simulado:', contenido);
      // Buscar el índice del contenido a actualizar
      const index = this.mockContenidos.findIndex(c => c.id === contenido.id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Contenido con ID ${contenido.id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Actualizar el contenido en la lista simulada
      this.mockContenidos[index] = { ...contenido };
      
      // Retornar observable con el contenido actualizado
      return of(this.mockContenidos[index]).pipe(
        delay(500)
      );
    }
    return this.http.put<Contenido>(`${this.apiUrl}/${contenido.id}`, contenido);
  }

  // Eliminar un contenido
  deleteContenido(id: number): Observable<void> {
    if (this.useMockData) {
      console.log('Eliminando contenido simulado con ID:', id);
      // Buscar el índice del contenido a eliminar
      const index = this.mockContenidos.findIndex(c => c.id === id);
      
      // Si no existe, retornar error
      if (index === -1) {
        return throwError(() => new Error(`Contenido con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Eliminar el contenido de la lista simulada
      this.mockContenidos.splice(index, 1);
      
      // Retornar observable vacío (void)
      return of(void 0).pipe(
        delay(500)
      );
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener un contenido por ID
  getContenidoById(id: number): Observable<Contenido> {
    if (this.useMockData) {
      console.log('Obteniendo contenido simulado con ID:', id);
      // Buscar el contenido por ID
      const contenido = this.mockContenidos.find(c => c.id === id);
      
      // Si no existe, retornar error
      if (!contenido) {
        return throwError(() => new Error(`Contenido con ID ${id} no encontrado`)).pipe(
          delay(500)
        );
      }
      
      // Retornar observable con el contenido encontrado
      return of({...contenido}).pipe(
        delay(500)
      );
    }
    return this.http.get<Contenido>(`${this.apiUrl}/${id}`);
  }

  // Método para alternar entre datos simulados y reales
  // Útil si en el futuro quieres probar con el backend real
  toggleMockData(useMock: boolean): void {
    this.useMockData = useMock;
    console.log('Modo datos simulados:', this.useMockData ? 'ACTIVADO' : 'DESACTIVADO');
  }
}