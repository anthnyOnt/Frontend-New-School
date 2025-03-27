import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CursoService } from '../../services/curso/curso.service';
import { Curso } from '../../../core/interfaces/curso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent {
  @Input() curso!: Curso;  
  @Output() cursoEliminado = new EventEmitter<number>();  
  @Output() cursoEditar = new EventEmitter<Curso>();
  isDropdownVisible = false;

  constructor(private CursoService: CursoService) {}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  getNombre(): string{
    return this.curso.nombre;
  }

  getDescripcion(): string{
    return this.curso.descripcion;
  }

  getfechaCreacion(): Date{
    return this.curso.fechaCreacion;
  }

  onEdit(): void {
    console.log('Editar Curso', this.curso.id);
    console.log("Curso: ",this.curso);
    this.isDropdownVisible = false;
    console.log(this.cursoEditar.emit(this.curso)); 
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el Curso ${this.curso.nombre}?`)) {
      this.CursoService.deleteCurso(this.curso.id).subscribe({
        next: () => {
          console.log('Curso eliminado correctamente');
          this.cursoEliminado.emit(this.curso.id); 
        },
        error: (error) => {
          console.error('Error al eliminar Curso:', error);
        }
      });
    }
  }

  eliminarCurso(): void {
    this.cursoEliminado.emit(this.curso.id);
  }
}
