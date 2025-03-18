import { Component, Input} from "@angular/core";
import { Curso } from "../../../core/interfaces/curso";
import { CursoComponent } from "../../components/curso/curso.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cursos",
  standalone: true,
  imports: [CommonModule, CursoComponent],
  templateUrl: "./cursos.component.html",
  styleUrl: "./cursos.component.scss",
})
export class CursosComponent {
  //@Input() cursos!: Curso[]
  cursosEj: Curso[] = [{
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
}
