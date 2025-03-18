import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})

export class CursoFormComponent {
  nombre: string = '';
  descripcion: string = '';
  fechaCreacion: Date = new Date();
  grado: string = '';

  registrar() {

  }
}
