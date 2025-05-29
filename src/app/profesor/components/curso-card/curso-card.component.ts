import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { CommonModule } from '@angular/common';
import { CursoCompleto } from '../../../core/interfaces/curso-completo';
import { Curso } from '../../../core/interfaces/curso';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './curso-card.component.html',
  styleUrl: './curso-card.component.scss'
})
export class CursoCardComponent implements OnInit{
  @Input() curso!: Curso;  
  @Input() gradoDescripcion?: string;

  ngOnInit(): void {
    console.log(this.curso);
  }

}