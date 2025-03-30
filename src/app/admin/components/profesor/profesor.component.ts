import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';

import { Profesor } from '../../../core/interfaces/profesor';
import { CommonModule } from '@angular/common';
import { ProfesorService } from '../../services/profesor/profesor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.scss'
})
export class ProfesorComponent implements OnInit {
  profesores: Profesor[] = [];
  profesorService = inject(ProfesorService);
  @Input() profesor!: Profesor; // Asegúrate de que esto está definido
  @Output() profesorEliminado = new EventEmitter<number>();
  @Output() profesorEditar = new EventEmitter<Profesor>();
  
  ngOnInit() {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.profesorService.getProfesores().subscribe(data => {
      this.profesores = data;
    });
  }

  eliminarProfesor(profesor: Profesor) {
    if (confirm(`¿Seguro que quieres eliminar a ${profesor.nombre}?`)) {
      this.profesorService.deleteProfesor(profesor.id).subscribe(() => {
        this.profesores = this.profesores.filter(p => p.id !== profesor.id);
      });
    }
  }

  trackById(index: number, prof: Profesor): number {
    return prof.id;
  }

  editarProfesor(profesor: Profesor) {
    console.log('Editar profesor:', profesor);
  }
}