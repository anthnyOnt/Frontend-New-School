import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../../core/interfaces/tarea';
import { TareaService } from '../../../admin/services/tarea/tarea.service';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.scss'
})
export class TareaFormComponent implements OnInit, OnChanges {
  @Input() cursoId!: number;
  @Input() tareaEditar: Tarea | null = null;
  @Output() tareaAgregada = new EventEmitter<Tarea>();
  @Output() cerrar = new EventEmitter<void>();

  tarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    fecha_entrega: new Date(),
    puntaje_maximo: 10,
    cursoId: 0,
    archivo: ""
  };

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm(): void {
    if (this.tareaEditar) {
      // Si estamos editando, copiamos los datos de la tarea a editar
      this.tarea = { ...this.tareaEditar };
    } else {
      // Si estamos creando, inicializamos con valores por defecto
      const fechaEntrega = new Date();
      fechaEntrega.setDate(fechaEntrega.getDate() + 7); // Por defecto, una semana para entregar
      
      this.tarea = {
        id: 0,
        titulo: '',
        descripcion: '',
        fecha_entrega: fechaEntrega,
        puntaje_maximo: 10,
        cursoId: this.cursoId,
        archivo: ""
      };
    }
  }

  guardarTarea(): void {
    if (this.validarFormulario()) {
      // Asegurarnos que el curso_id es el correcto
      this.tarea.cursoId = this.cursoId;
      
      if (this.tareaEditar) {
        // Editar tarea existente
        this.tareaService.updateTarea(this.tarea).subscribe({
          next: (tareaActualizada) => {
            this.tareaAgregada.emit(tareaActualizada);
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('Error al actualizar la tarea:', err);
            alert('Hubo un problema al actualizar la tarea. Por favor, intente nuevamente.');
          }
        });
      } else {
        // Crear nueva tarea
        this.tareaService.addTarea(this.tarea).subscribe({
          next: (nuevaTarea) => {
            this.tareaAgregada.emit(nuevaTarea);
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('Error al crear la tarea:', err);
            alert('Hubo un problema al crear la tarea. Por favor, intente nuevamente.');
          }
        });
      }
    }
  }

  validarFormulario(): boolean {
    // Validación básica
    if (!this.tarea.titulo.trim()) {
      alert('El título es obligatorio');
      return false;
    }
    if (!this.tarea.descripcion.trim()) {
      alert('La descripción es obligatoria');
      return false;
    }
    if (this.tarea.puntaje_maximo <= 0) {
      alert('El puntaje máximo debe ser mayor a 0');
      return false;
    }
    
    return true;
  }
}
