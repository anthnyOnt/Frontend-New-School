import { Component, OnInit } from '@angular/core';
import { CursoCardComponent } from '../../components/curso-card/curso-card.component';
import { Curso } from '../../../core/interfaces/curso';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { ProfesorService } from '../../../admin/services/profesor/profesor.service';
import { AuthService } from '../../../auth/login/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CursoCardComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class ProfesorMainComponent implements OnInit{
  cursos: Curso[] = []
  cargando: boolean = false;
  error: string | null = null;
  profesorId: number | null = null;

  constructor(private cursoService: CursoService, private profesorService: ProfesorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.error = null;
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'No se pudo obtener el ID del usuario.';
      this.cargando = false;
      return;
    }
    this.profesorService.getProfesorById(userId).subscribe({
      next: (profesor) => {
        this.profesorId = profesor.id;
        this.cursoService.getCursoByProfesor(this.profesorId).subscribe({
          next: (cursos) => {
            this.cursos = cursos;
            this.cargando = false;
          },
          error: (err) => {
            console.error('Error al cargar los cursos:', err);
            this.error = 'No se pudieron cargar los cursos. Por favor, intente nuevamente.';
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el ID del profesor:', err);
        this.error = 'No se pudo obtener el ID del profesor. Por favor, intente nuevamente.';
      }
    });

    
  }
  trackById(index: number, grado: Curso): number {
    return grado.id;
  }
}