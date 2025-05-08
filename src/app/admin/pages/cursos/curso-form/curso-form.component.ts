import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../../core/interfaces/curso';
import { CursoService } from '../../../services/curso/curso.service';
import { NgFor } from '@angular/common';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule, NgFor, KeyValuePipe],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})

export class CursoFormComponent {
  @Input() cursoEditar: Curso | null = null;
  @Input() grados!: Map<number, string>
  @Input() profesores!: Map<number, string>
  @Output() cursoAgregado = new EventEmitter<Curso>();
  @Output() cerrar = new EventEmitter<void>();

  curso: Curso = {
    id: 0,
    nombre: '',
    descripcion: '',
    gradoId: 0,
    docenteId: 0
  };

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm(): void {
    if (this.cursoEditar) {
      this.curso = { ...this.cursoEditar };
    } else {
      this.curso = {
        id: 4,
        nombre: '',
        descripcion: '',
        gradoId: 0,
        docenteId: 0
      };
    }
  }

  trackById(index: number, curso: Curso) {
    return curso.id;
  }
  

  guardarCurso(): void {
    if (this.cursoEditar) {
      this.cursoService.updateCurso(this.curso).subscribe(() => {
        this.cursoAgregado.emit(this.curso);
        this.cerrar.emit();
      });
    } else {
      console.log(this.curso);
      this.cursoService.addCurso(this.curso).subscribe((nuevoCurso) => {
        this.cursoAgregado.emit(nuevoCurso);
        this.cerrar.emit();
        console.log('nuevo curso: ', this.curso)
      });
    }
  }
}
