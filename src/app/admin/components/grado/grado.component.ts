import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Grado } from '../../../core/interfaces/grado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grado.component.html',
  styleUrl: './grado.component.scss'
})
export class GradoComponent {
  @Input() grado!: Grado;  // Recibimos el objeto grado como un input
  @Output() gradoEliminado = new EventEmitter<number>();  // Emitimos el id del grado cuando se elimina
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  // Método para formatear el tipo de grado
  getTipoGrado(): string {
    return this.grado.primaria_secundaria ? 'Secundaria' : 'Primaria';
  }

  // Métodos de acción (editar, eliminar)
  onEdit(): void {
    console.log('Editar grado', this.grado.id);
    // Aquí va la lógica para editar el grado (ej. abrir un formulario de edición)
  }

  onDelete(): void {
    console.log('Eliminar grado', this.grado.id);
    // Aquí va la lógica para eliminar el grado
  }

  eliminarGrado(): void {
    // Emitimos el id del grado para que el padre lo maneje
    this.gradoEliminado.emit(this.grado.id);
  }
}