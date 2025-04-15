import { Component, OnInit} from "@angular/core";
import { Curso } from "../../../../core/interfaces/curso";
import { CursoComponent } from "../../../components/curso/curso.component";
import { CommonModule } from "@angular/common";
import { CursoFormComponent } from "../curso-form/curso-form.component";
import { FormsModule } from "@angular/forms";
import { CursoService } from "../../../services/curso/curso.service";
import { GradoService } from "../../../services/grado/grado.service";
import { RouterLink } from "@angular/router";
import { Grado } from "../../../../core/interfaces/grado";
import { GradosAddComponent } from "../../grados/grados-add/grados-add.component";

@Component({
  selector: "app-cursos",
  standalone: true,
  imports: [CommonModule, CursoComponent, CursoFormComponent, FormsModule, RouterLink],
  templateUrl: "./cursos.component.html",
  styleUrl: "./cursos.component.scss",
})
export class CursosComponent implements OnInit {
  
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  gradosMap = new Map<number, string>();
  
  terminoBusqueda: string = '';
  
  mostrarFormulario = false;
  cursoEditar: Curso | null = null; 
  
  cargando: boolean = false;
  error: string | null = null;

  constructor(private cursoService: CursoService, private gradoService: GradoService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = null;
    
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.cursosFiltrados = [...this.cursos];
        this.cargarGrados()
      },
      error: (err) => {
        console.error('Error al cargar los cursos:', err);
        this.error = 'No se pudieron cargar los cursos. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
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