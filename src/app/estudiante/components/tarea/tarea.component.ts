import { Component, Input, OnInit } from '@angular/core';
import { Tarea } from '../../../core/interfaces/tarea';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent implements OnInit{
@Input() tarea?: Tarea;

  ngOnInit(): void {
      console.log('Componente tarea inicializado');
  }
}
