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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.tareaService.getTareaById(+id).subscribe({
          next: tarea => {
            this.tarea = tarea;
            console.log('Tarea cargada dinámicamente:', tarea);
          },
          error: err => {
            console.error('Error al cargar tarea:', err);
          }
        });
      }
    });
  }
  

  mostrarFormularioEntrega() {
    this.mostrarEditor = true;
  }
}
