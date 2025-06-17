import { Component, OnInit, inject} from '@angular/core';
import { Padre } from '../../../../core/interfaces/padre';
import { PadreService } from '../../../services/padre/padre.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ver-padres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-padres.component.html',
  styleUrl: './ver-padres.component.scss'
})
export class VerPadresComponent implements OnInit {
  padreService = inject(PadreService);
  padres: Padre[] = [];
  ngOnInit() {
    this.cargarPadres();
    console.log(this.padres);
  }

  cargarPadres() {
    this.padreService.getPadres().subscribe(data => {
      this.padres = data;
    });
  }
  eliminarPadre(padre: Padre): void {
    if (confirm('¿Seguro que quieres eliminar este padre?')) {
      this.padreService.deletePadre(padre.id).subscribe(() => {
        this.padres = this.padres.filter(p => p.id !== padre.id);
      });
    }
  }
  trackById(index: number, padre: Padre): number {
    return padre.id; // Devolver el id como identificador único para cada estudiante
  }
}
