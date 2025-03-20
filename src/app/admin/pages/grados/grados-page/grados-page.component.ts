import { Component, OnInit } from '@angular/core';
import { Grado } from '../../../../core/interfaces/grado';
import { GradoComponent } from "../../../components/grado/grado.component";
import { CommonModule } from '@angular/common';
import { GradosAddComponent } from '../grados-add/grados-add.component';
import { FormsModule } from '@angular/forms';
import { GradoService } from '../../../services/grado/grado.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grados-page',
  standalone: true,
  imports: [GradoComponent, CommonModule, GradosAddComponent, FormsModule,RouterLink],
  templateUrl: './grados-page.component.html',
  styleUrl: './grados-page.component.scss'
})
export class GradosPageComponent implements OnInit {
  
  // Lista original de grados
  grados: Grado[] = [];

  // Lista de grados filtrados que se muestra
  gradosFiltrados: Grado[] = [];
  
  // Término de búsqueda
  terminoBusqueda: string = '';
  
  mostrarFormulario = false;
  gradoEditar: Grado | null = null; // Grado a editar
  
  // Indicadores de estado
  cargando: boolean = false;
  error: string | null = null;

  constructor(private gradoService: GradoService) { }

  ngOnInit(): void {
    this.cargarGrados();
  }

  // Método para cargar los grados desde el servicio
  cargarGrados(): void {
    this.cargando = true;
    this.error = null;
    
    this.gradoService.getGrados().subscribe({
      next: (grados) => {
        this.grados = grados;
        this.gradosFiltrados = [...this.grados];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los grados:', err);
        this.error = 'No se pudieron cargar los grados. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  // Método para filtrar grados según el término de búsqueda
  filtrarGrados(): void {
    if (!this.terminoBusqueda.trim()) {
      // Si no hay término de búsqueda, mostrar todos los grados
      this.gradosFiltrados = [...this.grados];
    } else {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      this.gradosFiltrados = this.grados.filter(grado => 
        grado.descripcion.toLowerCase().includes(termino)
      );
    }
  }

  // Método para editar grado
  editarGrado(grado: Grado): void {
    this.gradoEditar = { ...grado }; // Copia los datos del grado para edición
    this.mostrarFormulario = true; // Mostrar el formulario
  }

  abrirFormulario() {
    this.gradoEditar = null;
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.gradoEditar = null;
  }

  agregarNuevoGrado(nuevoGrado: Grado) {
    // Ya no necesitamos manejar aquí la lógica de agregar/actualizar
    // porque el componente de GradosAddComponent ya lo hace a través del servicio
    
    // Simplemente volvemos a cargar los grados después de agregar/actualizar
    this.cargarGrados();
    this.cerrarFormulario();
  }

  // Método para manejar la eliminación de un grado
  manejarGradoEliminado(id: number): void {
    this.gradoService.deleteGrado(id).subscribe({
      next: () => {
        // Actualizar la lista después de eliminar
        this.cargarGrados();
      },
      error: (err) => {
        console.error('Error al eliminar el grado:', err);
        // Opcional: Mostrar mensaje de error
      }
    });
  }

  // Función trackBy para mejorar el rendimiento
  trackById(index: number, grado: Grado): number {
    return grado.id; // Devolver el id como identificador único para cada grado
  }
}