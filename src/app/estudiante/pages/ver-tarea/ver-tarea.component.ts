import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../core/interfaces/tarea';
import { ActivatedRoute } from '@angular/router';
import { TareaService } from '../../../admin/services/tarea/tarea.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({ 
  selector: 'app-ver-tarea',
  standalone: true,
  imports: [CommonModule, RouterModule],  // date pipe ya disponible con CommonModule
  templateUrl: './ver-tarea.component.html',
  styleUrls: ['./ver-tarea.component.scss']  // corregido el nombre
})
export class VerTareaComponent implements OnInit {
  tarea?: Tarea;
  mostrarEditor = false;

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    // Ajusta el nombre del parámetro según tu routing
    const tareaId = this.route.snapshot.paramMap.get('id');  

    if (tareaId) {
      this.tareaService.getTareaById(Number(tareaId)).subscribe({
        next: (tarea) => {
          this.tarea = tarea;
        },
        error: (err) => {
          console.error('Error al obtener tarea!', err);
        }
      });
    } else {
      console.warn('No se encontró id en la URL');
    }
  }

  mostrarFormularioEntrega() {
    this.mostrarEditor = true;
  }
}
