import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Estudiante } from '../../../core/interfaces/estudiante';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent {
  @Input() estudiante!: Estudiante;
  @Output() eliminar = new EventEmitter<number>();

  editarEstudiante() {
    console.log('Editar:', this.estudiante);
    // Implement edit logic (open modal, navigate, etc.)
  }

  eliminarEstudiante() {
    this.eliminar.emit(this.estudiante.id);
  }
}