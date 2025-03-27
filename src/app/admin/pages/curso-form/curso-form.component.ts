import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../core/interfaces/curso';
import { CursoService } from '../../services/curso/curso.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})

export class CursoFormComponent {
  @Input() cursoEditar: Curso | null = null;
  @Output() cursoAgregado = new EventEmitter<Curso>();
  @Output() cerrar = new EventEmitter<void>();

  curso: Curso = {
    id: 0,
    nombre: '',
    descripcion: '',
    fechaCreacion: new Date()
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
        id: 0,
        nombre: '',
        descripcion: '',
        fechaCreacion: new Date()
      };
    }
  }

  guardarCurso(): void {
    if (this.cursoEditar) {
      this.cursoService.updateCurso(this.curso).subscribe(() => {
        this.cursoAgregado.emit(this.curso);
        this.cerrar.emit();
      });
    } else {
      this.cursoService.addCurso(this.curso).subscribe((nuevoCurso) => {
        this.cursoAgregado.emit(nuevoCurso);
        this.cerrar.emit();
      });
    }
  }
}
