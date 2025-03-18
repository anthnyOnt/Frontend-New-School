import { Component, OnInit, inject } from '@angular/core';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { Estudiante } from  '../../../core/interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteComponent } from '../../components/estudiante/estudiante.component';

@Component({
  selector: 'app-ver-estudiantes',
  standalone: true,
  templateUrl: './ver-estudiantes.component.html',
  styleUrls: ['./ver-estudiantes.component.scss'],
  imports: [EstudianteComponent, CommonModule]
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

  eliminarEstudiante(id: number) {
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
      this.estudianteService.deleteEstudiante(id).subscribe(() => {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
      });
    }
  }
  trackById(index: number, est: Estudiante): number {
    return est.id; // Devolver el id como identificador único para cada estudiante
  }
}