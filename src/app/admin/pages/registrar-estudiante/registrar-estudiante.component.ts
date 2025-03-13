import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-estudiante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-estudiante.component.html',
  styleUrl: './registrar-estudiante.component.scss'
})
export class RegistrarEstudianteComponent {
  nombre = '';
  apellido = '';
  carnet = '';
  email = '';
  router = inject(Router);
  
  registrar() {

  }
  
}
