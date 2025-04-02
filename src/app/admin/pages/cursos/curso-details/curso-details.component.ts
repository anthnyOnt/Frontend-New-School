import { Component, Input } from '@angular/core';
import { Contenido } from '../../../../core/interfaces/contenido';
import { Curso } from '../../../../core/interfaces/curso';
import { ContenidosPageComponent } from '../../contenidos/contenidos-page/contenidos-page.component';

@Component({
  selector: 'app-curso-details',
  standalone: true,
  imports: [ContenidosPageComponent],
  templateUrl: './curso-details.component.html',
  styleUrl: './curso-details.component.scss'
})
export class CursoDetailsComponent {
  @Input() curso!: Curso
  @Input() contenidos?: Contenido[] 
}
