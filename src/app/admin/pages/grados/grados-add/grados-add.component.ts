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

  @Input() gradoEditar: Grado | null = null; // Si hay un grado, es edición
  @Output() gradoAgregado = new EventEmitter<Grado>();
  @Output() cerrar = new EventEmitter<void>();
  
  grado: Grado = {
    id: 0, // Se generará en el backend
    descripcion: '',
    primariaSencundaria: true,
  };
  
  constructor(private gradoService: GradoService) {}
  
  ngOnInit(): void {
    this.resetForm();
  }

  // Este método se ejecutará cada vez que cambien las propiedades de entrada
  ngOnChanges(): void {
    this.resetForm();
  }

  // Método para resetear el formulario según si estamos editando o creando
  resetForm(): void {
    if (this.gradoEditar) {
      // Si estamos editando, copiamos los datos del grado a editar
      this.grado = { ...this.gradoEditar };
    } else {
      // Si estamos creando, inicializamos con valores por defecto
      this.grado = {
        id: 0,
        descripcion: '',
        primariaSencundaria: true,
      };
    }
  }
  
  guardarGrado(): void {
    if (this.gradoEditar) {
      this.gradoService.updateGrado(this.grado).subscribe(() => {
        this.gradoAgregado.emit(this.grado);
        this.cerrar.emit();
      });
    } else {
      this.gradoService.addGrado(this.grado).subscribe((nuevoGrado) => { // Cambiar a createGrado
        this.gradoAgregado.emit(nuevoGrado);
        this.cerrar.emit();
      });
    }
  }
}