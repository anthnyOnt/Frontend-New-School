import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Curso } from '../../../core/interfaces/curso';
import { Input, Output } from '@angular/core';
import { CursoService } from '../../../admin/services/curso/curso.service';
@Component({
  selector: 'app-curso-card',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './curso-card.component.html',
  styleUrl: './curso-card.component.scss'
})
export class CursoCardComponent {
  @Input() curso! : Curso;
  constructor(cursoService: CursoService) {}
}
