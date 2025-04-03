import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Contenido } from '../../../core/interfaces/contenido';
import { CommonModule } from '@angular/common';
import { ContenidoService } from '../../services/contenido/contenido.service';
import { Curso } from '../../../core/interfaces/curso';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.scss'
})
export class ContenidoComponent {
  @Input() contenido!: Contenido;  // Recibimos el objeto contenido como un input
  @Output() contenidoEliminado = new EventEmitter<number>();  // Emitimos el id del contenido cuando se elimina
  isDropdownVisible = false;

  constructor(private contenidoService: ContenidoService) {}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Métodos de acción (editar, eliminar)
  onEdit(): void {
    console.log('Editar contenido', this.contenido.id);
    console.log("contenido: ",this.contenido);
    this.isDropdownVisible = false;
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el contenido ${this.contenido.descripcion}?`)) {
      this.contenidoService.deleteContenido(this.contenido.id).subscribe({
        next: () => {
          console.log('contenido eliminado correctamente');
          this.contenidoEliminado.emit(this.contenido.id); // Emitimos el evento para que el padre lo actualice
        },
        error: (error) => {
          console.error('Error al eliminar contenido:', error);
        }
      });
    }
  }

  eliminarContenido(): void {
    // Emitimos el id del contenido para que el padre lo maneje
    this.contenidoEliminado.emit(this.contenido.id);
  }
}