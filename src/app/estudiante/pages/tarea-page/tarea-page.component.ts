import { Component } from '@angular/core';
import { Tarea } from '../../../core/interfaces/tarea';
import { ActivatedRoute } from '@angular/router';
import { TareaService } from '../../../admin/services/tarea/tarea.service';


@Component({
  selector: 'app-tarea-page',
  standalone: true,
  imports: [],
  templateUrl: './tarea-page.component.html',
  styleUrl: './tarea-page.component.scss'
})
export class TareaPageComponent {
  tarea!: Tarea

  constructor(private route: ActivatedRoute, private tareaService: TareaService){}

  ngOnInit(): void {
    const tareaId = this.route.snapshot.paramMap.get('tareaId'); // OBTENER ID DE LA URL
    this.tareaService.getTareaById(Number(tareaId)).subscribe({
      next: (tarea) => {
        this.tarea = tarea
      },
      error: (err) => console.error('Error al obtener tarea:', err)
    });
  }
}
