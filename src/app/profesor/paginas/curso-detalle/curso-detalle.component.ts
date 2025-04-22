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
import { ContenidoFormComponent } from '../../components/contenido-form/contenido-form.component';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    TabViewModule, 
    CardModule,
    DividerModule,
    ButtonModule,
    ContenidoFormComponent
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
  
  // Control del formulario de contenido
  mostrarFormularioContenido: boolean = false;
  contenidoEditar: Contenido | null = null;

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

  // Métodos para gestionar el formulario de contenido
  abrirFormularioContenido(): void {
    this.contenidoEditar = null;
    this.mostrarFormularioContenido = true;
  }

  cerrarFormularioContenido(): void {
    this.mostrarFormularioContenido = false;
    this.contenidoEditar = null;
  }

  manejarContenidoAgregado(contenido: Contenido): void {
    // Recargar los contenidos después de agregar/actualizar
    if (this.curso) {
      this.cargarContenidos(this.curso.id);
    }
  }

  editarContenido(contenido: Contenido): void {
    this.contenidoEditar = { ...contenido };
    this.mostrarFormularioContenido = true;
  }

  eliminarContenido(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este contenido?')) {
      this.contenidoService.deleteContenido(id).subscribe({
        next: () => {
          if (this.curso) {
            this.cargarContenidos(this.curso.id);
          }
        },
        error: (err) => {
          console.error('Error al eliminar el contenido:', err);
          alert('No se pudo eliminar el contenido. Por favor, intente nuevamente.');
        }
      });
    }
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