import { Injectable } from '@angular/core';
import { Curso } from '../../core/interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursos: Array<Curso> = [{
    id: 1,
    nombre: 'Fisica',
    descripcion: 'Curso de fisica',
    fechaCreacion: new Date(2024, 2, 14)
  },
  {
    id: 2,
    nombre: 'Quimica',
    descripcion: 'Curso de quimica',
    fechaCreacion: new Date(2024, 2, 14)
  },
  {
    id: 3,
    nombre: 'Matematica',
    descripcion: 'Curso de matematica',
    fechaCreacion: new Date(2024, 2, 14)
  },
  ]
  constructor() { }
}
