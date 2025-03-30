import { Component, EventEmitter, Input, Output, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { CursoService } from '../../services/curso/curso.service';
import { CommonModule } from '@angular/common';
import { CursoCompleto } from '../../../core/interfaces/curso-completo';
import { GradoService } from '../../services/grado/grado.service';
import { Curso } from '../../../core/interfaces/curso';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent implements OnInit, OnChanges{
  @Input() curso!: Curso;  
  @Output() cursoEliminado = new EventEmitter<number>();  
  @Output() cursoEditar = new EventEmitter<CursoCompleto>();
  isDropdownVisible = false;

  cursoCompleto!: CursoCompleto;

  constructor(private CursoService: CursoService, private gradoService: GradoService) {}

  ngOnInit(): void {
    console.log("Curso component inicializado")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Cambio detectado en curso component: ", changes)
    this.cursoCompleto = {...this.curso}
    this.gradoService.getGradoById(this.cursoCompleto.gradoId).subscribe({
      next: (grado) => {
        this.cursoCompleto.grado = grado
      },
      error: (err) => {
        console.error('Error al obtener grado: ', err)
      }
    })
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
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
