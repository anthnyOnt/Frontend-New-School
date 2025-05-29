import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { Tarea } from '../../../core/interfaces/tarea';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { TareaService } from '../../../admin/services/tarea/tarea.service';
import { InscripcionService } from '../../../admin/services/inscripcion/inscripcion.service';
import { EstudianteService } from '../../../admin/services/estudiante/estudiante.service';
import { AuthService } from '../../../auth/login/service/auth.service';
import { CursoComponent } from "../../../admin/components/curso/curso.component";
import { TareaComponent } from '../../components/tarea/tarea.component';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-estudiante-main',
  standalone: true,
  imports: [CursoComponent, CursoComponent, TareaComponent, CommonModule],
  templateUrl: './estudiante-main.component.html',
  styleUrl: './estudiante-main.component.scss'
})
export class EstudianteMainComponent implements OnInit{
  cursos: Curso[] = [];
  tareas: Tarea[] = [];

  cargando: boolean = false;
  error: string | null = null;

  constructor(private estudianteService: EstudianteService, private authService: AuthService, private cursoService: CursoService, private tareaService: TareaService, private inscripcionService: InscripcionService) { }

  @ViewChild('tareasCarrusel', { static: false }) tareasCarrusel!: ElementRef;
  mostrarFlechaIzquierda = false;

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarTareas();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.error = null;
    const userId = this.authService.getUserId();
    let estudianteId;
    let gradoId;
    if(!userId) {
      return
    }
    this.estudianteService.getEstudianteByUserId(userId).subscribe({
      next: (estudiante) => {
        estudianteId = estudiante.id;
        this.inscripcionService.getInscripcionByEstudianteId(estudianteId).subscribe({
          next: (inscripciones) => {
            gradoId = inscripciones[0].gradoId;
            this.cursoService.getCursoByGrado(gradoId).subscribe({
              next: (cursos) => {
                this.cursos = cursos;
                this.cargando = false;
              }
            })
          }
        })
      }
    })
  }

  cargarTareas(): void {
    this.cargando = true;
    this.error = null;
    
    this.tareaService.getTareas().subscribe({
      next: (tareas) => {
        this.tareas = tareas;
      },
      error: (err) => {
        console.error('Error al cargar los tareas:', err);
        this.error = 'No se pudieron cargar los tareas. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  ngAfterViewInit(): void {
    // Esperar un momento para que las tareas se carguen
    setTimeout(() => this.verificarFlechas(), 300);
  }

  scrollTareas(direccion: 'izquierda' | 'derecha') {
    const scrollAmount = 300;
    const container = this.tareasCarrusel.nativeElement;

    if (direccion === 'izquierda') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Pequeño delay para permitir que el scroll se complete antes de verificar
    setTimeout(() => this.verificarFlechas(), 350);
  }

  verificarFlechas(): void {
    const container = this.tareasCarrusel.nativeElement;
    this.mostrarFlechaIzquierda = container.scrollLeft > 0;
  }
}
