import { Component, Input, inject} from "@angular/core";
import { Curso } from "../../../core/interfaces/curso";
import { CursoComponent } from "../../components/curso/curso.component";
import { CommonModule } from "@angular/common";
import { CursoService } from "../../services/curso.service";

@Component({
  selector: "app-cursos",
  standalone: true,
  imports: [CommonModule, CursoComponent],
  templateUrl: "./cursos.component.html",
  styleUrl: "./cursos.component.scss",
})
export class CursosComponent {
  cursoService = inject(CursoService)
  cursos = this.cursoService.cursos
}
