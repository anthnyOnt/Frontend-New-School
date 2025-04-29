import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { Tarea } from '../../../core/interfaces/tarea';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { CursoComponent } from "../../../admin/components/curso/curso.component";

@Component({
  selector: 'app-estudiante-main',
  standalone: true,
  imports: [CursoComponent, CursoComponent, CommonModule],
  templateUrl: './estudiante-main.component.html',
  styleUrl: './estudiante-main.component.scss'
})
export class EstudianteMainComponent implements OnInit{
  cursos: Curso[] = [];
  //tareas: Tarea[] = [];

  cargando: boolean = false;
  error: string | null = null;

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.error = null;
    
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (err) => {
        console.error('Error al cargar los cursos:', err);
        this.error = 'No se pudieron cargar los cursos. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }
}
