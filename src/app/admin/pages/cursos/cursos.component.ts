import { Component, OnInit, inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CursoService } from "../../services/curso.service";
import { RouterLink } from "@angular/router";
import { Curso } from "../../../core/interfaces/curso";

@Component({
  selector: "app-cursos",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./cursos.component.html",
  styleUrl: "./cursos.component.scss",
})
export class CursosComponent implements OnInit{
  cursos: Array<Curso> = [];
  cursoService = inject(CursoService)

  ngOnInit() {
    this.cargarCursos();
  }  

  cargarCursos(){
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    })
  }

  eliminarCurso(curso: Curso){
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
      this.cursoService.deleteCurso(curso.id).subscribe(() => {
        this.cursos = this.cursos.filter(c => c.id !== curso.id);
      });
    }
  }
  trackById(index: number, curso: Curso): number {
    return curso.id; // Devolver el id como identificador único para cada estudiante
  }
  editarCurso(estudiante: Curso) {
  }
  
}
