// profesor-add.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Profesor } from '../../../../core/interfaces/profesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../../services/profesor/profesor.service';

@Component({
  selector: 'app-profesores-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesores-add.component.html',
  styleUrl: './profesores-add.component.scss',
})
export class ProfesorAddComponent {
  @Input() profesorEditar: Profesor | null = null;
  @Output() profesorAgregado = new EventEmitter<Profesor>();
  @Output() cerrar = new EventEmitter<void>();

  profesor: Profesor = {
    id: 0,
    usuario: {
      ci: 0,
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: 'DOCENTE',
    },
    licenciatura: '',
    titulo: '',
  };

  constructor(private profesorService: ProfesorService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm(): void {
    if (this.profesorEditar) {
      this.profesor = { ...this.profesorEditar };
    } else {
      this.profesor = {
        id: 0,
        usuario: {
          ci: 0,
          nombre: '',
          apellido: '',
          email: '',
          password: '',
          rol: 'DOCENTE',
        },
        licenciatura: '',
        titulo: '',
      };
    }
  }


  formatProfesor(profesor: Profesor): any {
    const profesorFormateado = {
      ci: profesor.usuario.ci,
      nombre: profesor.usuario.nombre,
      apellido: profesor.usuario.apellido,
      email: profesor.usuario.nombre + '.' + profesor.usuario.apellido + '@example.com',
      password: 'contraseña123',
      datosEspecificos: {
        licenciatura: profesor.licenciatura
      }
    }
    return profesorFormateado
  }

  guardarProfesor(): void {
    if (this.profesorEditar) {
      this.profesorService.updateProfesor(this.profesor).subscribe(() => {
        this.profesorAgregado.emit(this.profesor);
        this.cerrar.emit();
      });
    } else {
      let profesorFormateado = this.formatProfesor(this.profesor);
      this.profesorService.addProfesor(profesorFormateado).subscribe((nuevoProfesor) => {
        this.profesorAgregado.emit(nuevoProfesor);
        this.cerrar.emit();
      });
    }
  }
}
