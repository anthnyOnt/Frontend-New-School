import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Curso } from '../../../core/interfaces/curso';
import { Input } from '@angular/core';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './curso-card.component.html',
  styleUrl: './curso-card.component.scss'
})
export class CursoCardComponent {
  @Input() curso!: Curso;
  
  constructor(private cursoService: CursoService) {}
}
