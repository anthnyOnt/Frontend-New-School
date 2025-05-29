import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contenido } from '../../../core/interfaces/contenido';
import { ContenidoService } from '../../../admin/services/contenido/contenido.service';

@Component({
  selector: 'app-contenido-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contenido-form.component.html',
  styleUrl: './contenido-form.component.scss'
})
export class ContenidoFormComponent implements OnInit, OnChanges {
  @Input() cursoId!: number;
  @Input() contenidoEditar: Contenido | null = null;
  @Output() contenidoAgregado = new EventEmitter<Contenido>();
  @Output() cerrar = new EventEmitter<void>();

  contenido: Contenido = {
    id: 0,
    titulo: '',
    descripcion: '',
    tipo: 'documento',
    url: '',
    creacion: new Date(),
    cursoId: 0
  };

  tiposContenido = [
    { value: 'documento', label: 'Documento' },
    { value: 'video', label: 'Video' },
    { value: 'articulo', label: 'Artículo' },
    { value: 'enlace', label: 'Enlace' },
    { value: 'otro', label: 'Otro' }
  ];

  constructor(private contenidoService: ContenidoService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm(): void {
    if (this.contenidoEditar) {
      // Si estamos editando, copiamos los datos del contenido a editar
      this.contenido = { ...this.contenidoEditar };
    } else {
      // Si estamos creando, inicializamos con valores por defecto
      this.contenido = {
        id: 0,
        titulo: '',
        descripcion: '',
        tipo: 'documento',
        url: '',
        creacion: new Date(),
        cursoId: this.cursoId
      };
    }
  }

  guardarContenido(): void {
    if (this.validarFormulario()) {
      // Asegurarnos que el curso_id es el correcto
      this.contenido.cursoId = this.cursoId;
      
      if (this.contenidoEditar) {
        // Editar contenido existente
        this.contenidoService.updateContenido(this.contenido).subscribe({
          next: (contenidoActualizado) => {
            this.contenidoAgregado.emit(contenidoActualizado);
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('Error al actualizar el contenido:', err);
            alert('Hubo un problema al actualizar el contenido. Por favor, intente nuevamente.');
          }
        });
      } else {
        // Crear nuevo contenido
        this.contenidoService.addContenido(this.contenido).subscribe({
          next: (nuevoContenido) => {
            this.contenidoAgregado.emit(nuevoContenido);
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('Error al crear el contenido:', err);
            alert('Hubo un problema al crear el contenido. Por favor, intente nuevamente.');
          }
        });
      }
    }
  }

  validarFormulario(): boolean {
    // Validación básica
    if (!this.contenido.titulo.trim()) {
      alert('El título es obligatorio');
      return false;
    }
    if (!this.contenido.descripcion.trim()) {
      alert('La descripción es obligatoria');
      return false;
    }
    if (!this.contenido.url.trim()) {
      alert('La URL es obligatoria');
      return false;
    }
    // Verificar si la URL es válida
    try {
      new URL(this.contenido.url);
    } catch (_) {
      alert('Por favor, ingrese una URL válida');
      return false;
    }
    
    return true;
  }
}