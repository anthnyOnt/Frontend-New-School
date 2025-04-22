import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Curso } from '../../../core/interfaces/curso';
import { Contenido } from '../../../core/interfaces/contenido';
import { Tarea } from '../../../core/interfaces/tarea';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { ContenidoService } from '../../../admin/services/contenido/contenido.service';
import { TareaService } from '../../../admin/services/tarea/tarea.service';
import { switchMap } from 'rxjs/operators';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    TabViewModule, 
    CardModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss']
})
export class CursoDetalleComponent implements OnInit {
  curso: Curso | null = null;
  contenidos: Contenido[] = [];
  tareas: Tarea[] = [];
  cargando: boolean = true;
  error: string | null = null;
  activeTab: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private contenidoService: ContenidoService,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosCurso();
  }

  cargarDatosCurso(): void {
    this.cargando = true;
    this.error = null;

    this.route.paramMap.pipe(
      switchMap(params => {
        const cursoId = Number(params.get('id'));
        if (!cursoId) {
          throw new Error('ID de curso inválido');
        }
        return this.cursoService.getCursoById(cursoId);
      })
    ).subscribe({
      next: (curso) => {
        this.curso = curso;
        this.cargarContenidos(curso.id);
        this.cargarTareas(curso.id);
      },
      error: (err) => {
        console.error('Error al cargar el curso:', err);
        this.error = 'No se pudo cargar la información del curso. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  cargarContenidos(cursoId: number): void {
    this.contenidoService.getContenidosByCursoId(cursoId).subscribe({
      next: (contenidos) => {
        this.contenidos = contenidos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los contenidos:', err);
        this.error = 'No se pudieron cargar los contenidos del curso.';
        this.cargando = false;
      }
    });
  }

  cargarTareas(cursoId: number): void {
    this.tareaService.getTareasByCursoId(cursoId).subscribe({
      next: (tareas) => {
        this.tareas = tareas;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar las tareas:', err);
        this.error = 'No se pudieron cargar las tareas del curso.';
        this.cargando = false;
      }
    });
  }

  getTipoIcono(tipo: string): string {
    switch(tipo.toLowerCase()) {
      case 'video': return 'pi pi-video';
      case 'documento': return 'pi pi-file-pdf';
      case 'articulo': return 'pi pi-book';
      default: return 'pi pi-file';
    }
  }

  abrirContenido(url: string): void {
    window.open(url, '_blank');
  }

  cambiarTab(index: number): void {
    this.activeTab = index;
  }
}