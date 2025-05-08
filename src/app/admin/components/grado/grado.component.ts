import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Grado } from '../../../core/interfaces/grado';
import { CommonModule } from '@angular/common';
import { GradoService } from '../../services/grado/grado.service';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './grado.component.html',
  styleUrl: './grado.component.scss'
})
export class GradoComponent {
  @Input() grado!: Grado;  // Recibimos el objeto grado como un input
  @Output() gradoEliminado = new EventEmitter<number>();  // Emitimos el id del grado cuando se elimina
  @Output() gradoEditar = new EventEmitter<Grado>();
  isDropdownVisible = false;

  constructor(
    private gradoService: GradoService,
    private router: Router
  ) {}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  
  // Método para formatear el tipo de grado
  getTipoGrado(): string {
    return this.grado.primariaSencundaria ? 'Primaria' : 'Secundaria';
  }

  navigateToDetails(): void {
    this.router.navigate(['/admin/grados', this.grado.id]);
  }

  // Métodos de acción (editar, eliminar)
  onEdit(): void {
    console.log('Editar grado', this.grado.id);
    console.log("grado: ",this.grado);
    this.isDropdownVisible = false;
    console.log(this.gradoEditar.emit(this.grado)); // Emitimos el grado para que el padre lo maneje
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el grado ${this.grado.descripcion}?`)) {
      this.gradoService.deleteGrado(this.grado.id).subscribe({
        next: () => {
          console.log('Grado eliminado correctamente');
          this.gradoEliminado.emit(this.grado.id); // Emitimos el evento para que el padre lo actualice
        },
        error: (error) => {
          console.error('Error al eliminar grado:', error);
        }
      });
    }
  }

  eliminarGrado(): void {
    // Emitimos el id del grado para que el padre lo maneje
    this.gradoEliminado.emit(this.grado.id);
  }
}