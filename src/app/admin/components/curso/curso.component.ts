import { Component, Input, SimpleChanges } from '@angular/core';
import { Curso } from '../../../core/interfaces/curso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent{
  @Input() curso!: Curso;
}
