import { Component, OnInit, inject } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estudiante } from '../../../../core/interfaces/estudiante';

@Component({
  selector: 'app-ver-estudiantes',
  standalone: true,
  templateUrl: './ver-estudiantes.component.html',
  styleUrls: ['./ver-estudiantes.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class VerEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteService = inject(EstudianteService);

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(data => {
      this.estudiantes = data;
    });
  }

  eliminarEstudiante(estudiante: Estudiante) {
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
      this.estudianteService.deleteEstudiante(estudiante.id).subscribe(() => {
        this.estudiantes = this.estudiantes.filter(e => e.id !== estudiante.id);
      });
    }
  }
  trackById(index: number, est: Estudiante): number {
    return est.id; // Devolver el id como identificador único para cada estudiante
  }
  editarEstudiante(estudiante: Estudiante) {
  }

}