import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../core/interfaces/curso';
import { CursoService } from '../../services/curso/curso.service';
import { GradoService } from '../../services/grado/grado.service';
import { NgFor } from '@angular/common';
import { Grado } from '../../../core/interfaces/grado';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule, NgFor],
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
    fechaCreacion: new Date(),
    gradoId: 0,
  };
  grados: Grado[] = []

  constructor(private cursoService: CursoService, private gradoService: GradoService) {}

  ngOnInit(): void {
    this.resetForm();
    this.cargarGrados();
  }

  error: string | null = null;
  cargarGrados(): void {
    this.error = null;
    
    this.gradoService.getGrados().subscribe({
      next: (grados) => {
        this.grados = grados;
      },
      error: (err) => {
        console.error('Error al cargar los grados:', err);
        this.error = 'No se pudieron cargar los grados. Por favor, intente nuevamente.';
      }
    });
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
        fechaCreacion: new Date(),
        gradoId: 0
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
      this.cursoService.addCurso(this.curso).subscribe((nuevoCurso) => {
        this.cursoAgregado.emit(nuevoCurso);
        this.cerrar.emit();
        console.log('nuevo curso: ', this.curso)
      });
    }
  }
}
