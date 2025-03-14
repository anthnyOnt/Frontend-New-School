import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Grado } from '../../../../core/interfaces/grado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradoService } from '../../../services/grado/grado.service';

@Component({
  selector: 'app-grados-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './grados-add.component.html',
  styleUrl: './grados-add.component.scss'
})
export class GradosAddComponent {

  @Input() gradoEditar?: Grado; // Si hay un grado, es edición
  @Output() gradoAgregado = new EventEmitter<Grado>();
  @Output() cerrar = new EventEmitter<void>();

  grado: Grado = {
    id: 0, // Se generará en el backend
    descripcion: '',
    primaria_secundaria: true,
  };

  
  constructor(private gradoService: GradoService) {}

  ngOnInit(): void {
    if (this.gradoEditar) {
      this.grado = { ...this.gradoEditar }; // Copiamos los datos para edición
    }
  }

  guardarGrado(): void {
    if (this.gradoEditar) {
      // Editar
      this.gradoService.updateGrado(this.grado).subscribe(() => {
        this.gradoAgregado.emit(this.grado);
        this.cerrar.emit();
      });
    } else {
      // Crear
      this.gradoService.updateGrado(this.grado).subscribe((nuevoGrado) => {
        this.gradoAgregado.emit(nuevoGrado);
        this.cerrar.emit();
      });
    }
  }
  
}
