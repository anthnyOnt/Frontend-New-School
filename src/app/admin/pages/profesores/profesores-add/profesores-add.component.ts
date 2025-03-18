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
    nombre: '',
    fechaNacimiento: new Date(),
    nacionalidad: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: '',
    ci: '',
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
        nombre: '',
        fechaNacimiento: new Date(),
        nacionalidad: '',
        correo: '',
        telefono: '',
        direccion: '',
        rol: '',
        ci: '',
      };
    }
  }

  guardarProfesor(): void {
    if (this.profesorEditar) {
      this.profesorService.updateProfesor(this.profesor).subscribe(() => {
        this.profesorAgregado.emit(this.profesor);
        this.cerrar.emit();
      });
    } else {
      this.profesorService.addProfesor(this.profesor).subscribe((nuevoProfesor) => {
        this.profesorAgregado.emit(nuevoProfesor);
        this.cerrar.emit();
      });
    }
  }
}
