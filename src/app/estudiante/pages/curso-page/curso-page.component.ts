import { Component, OnInit} from "@angular/core";
import { Curso } from "../../../core/interfaces/curso";
import { CursoComponent } from "../../../admin/components/curso/curso.component";
import { CommonModule } from "@angular/common";
import { CursoService } from "../../../admin/services/curso/curso.service";
import { GradoService } from "../../../admin/services/grado/grado.service";
import { RouterLink } from "@angular/router";
import { ProfesorService } from "../../../admin/services/profesor/profesor.service";
import { EstudianteService } from "../../../admin/services/estudiante/estudiante.service";
import { AuthService } from "../../../auth/login/service/auth.service";
import { InscripcionService } from "../../../admin/services/inscripcion/inscripcion.service";

@Component({
  selector: 'app-curso-page',
  standalone: true,
  imports: [CommonModule, CursoComponent, RouterLink],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.scss'
})
export class CursoPageComponent implements OnInit {

  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  gradosMap = new Map<number, string>();
  profesoresMap = new Map<number, string>();
  
  terminoBusqueda: string = '';
  
  mostrarFormulario = false;
  cursoEditar: Curso | null = null; 
  
  cargando: boolean = false;
  error: string | null = null;

  constructor(
    private estudianteService: EstudianteService, 
    private authService: AuthService, 
    private cursoService: CursoService, 
    private inscripcionService: InscripcionService,
    private gradoService: GradoService,
    private profesorService: ProfesorService
    ) 
    { }
  
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
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

  cargarGrados(){
    this.gradoService.getGrados().subscribe({
      next: (grados) => {
        grados.forEach(grado => {
          this.gradosMap.set(grado.id, grado.descripcion)
        })
        this.cargando = false
      },
      error: (err) => {
        console.error('Error al cargar los grados en cursos component: ', err)
        this.error = "No se pudieron cargar los datos"
        this.cargando = false
      }
    })
  }

  cargarProfesores(){
    this.profesorService.getProfesores().subscribe({
      next: (profesores) => {
        profesores.forEach(profesor => {
          this.profesoresMap.set(profesor.id, profesor.usuario.nombre + " " + profesor.usuario.apellido)
        })
        this.cargando = false
      },
      error: (err) => {
        console.error('Error al cargar los grados en cursos component: ', err)
        this.error = "No se pudieron cargar los datos"
        this.cargando = false
      }
    })
  }

  filtrarCursos(): void {
    if (!this.terminoBusqueda.trim()) {
      this.cursosFiltrados = [...this.cursos];
    } else {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      this.cursosFiltrados = this.cursos.filter(curso => 
        curso.descripcion.toLowerCase().includes(termino)
      );
    }
  }

  editarCurso(curso: Curso): void {
    this.cursoEditar = { ...curso }; 
    this.mostrarFormulario = true; 
  }

  abrirFormulario() {
    this.cursoEditar = null;
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.cursoEditar = null;
  }

  agregarNuevoCurso(nuevoCurso: Curso) {
    this.cargarDatos();
    this.cerrarFormulario();
  }

  manejarCursoEliminado(id: number): void {
    this.cursoService.deleteCurso(id).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al eliminar el grado:', err);
      }
    });
  }

  trackById(index: number, grado: Curso): number {
    return grado.id; 
  }
}
