import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profesor } from '../../../core/interfaces/profesor';
import { CommonModule } from '@angular/common';
import { ProfesorService } from '../../services/profesor/profesor.service';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.scss'
})
export class ProfesorComponent {
  @Input() profesor!: Profesor;  
  @Output() profesorEliminado = new EventEmitter<number>();  
  @Output() profesorEditar = new EventEmitter<Profesor>();
  isDropdownVisible = false;

  constructor(private profesorService: ProfesorService) {}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  getNombre(): string{
    return this.profesor.nombre;
  }

  getCi(): string{
    return this.profesor.ci;
  }

  getCorreo(): string{
    return this.profesor.correo;
  }

  onEdit(): void {
    console.log('Editar profesor', this.profesor.id);
    console.log("profesor: ",this.profesor);
    this.isDropdownVisible = false;
    console.log(this.profesorEditar.emit(this.profesor)); 
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el profesor ${this.profesor.nombre}?`)) {
      this.profesorService.deleteProfesor(this.profesor.id).subscribe({
        next: () => {
          console.log('Profesor eliminado correctamente');
          this.profesorEliminado.emit(this.profesor.id); 
        },
        error: (error) => {
          console.error('Error al eliminar profesor:', error);
        }
      });
    }
  }

  eliminarProfesor(): void {
    this.profesorEliminado.emit(this.profesor.id);
  }
}