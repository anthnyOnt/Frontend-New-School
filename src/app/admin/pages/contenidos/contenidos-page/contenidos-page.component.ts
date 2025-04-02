import { Component, OnInit } from '@angular/core';
import { Contenido } from '../../../../core/interfaces/contenido';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContenidoService } from '../../../services/contenido/contenido.service';
import { RouterLink } from '@angular/router';
import { ContenidoComponent } from '../../../components/contenido/contenido.component';
import { ContenidoFormComponent } from '../contenido-form/contenido-form.component';

@Component({
  selector: 'app-contenidos-page',
  standalone: true,
  imports: [ContenidoComponent, CommonModule, ContenidoFormComponent, FormsModule, RouterLink],
  templateUrl: './contenidos-page.component.html',
  styleUrl: './contenidos-page.component.scss'
})
export class ContenidosPageComponent implements OnInit {
  
  // Lista original de contenidos
  contenidos: Contenido[] = [];

  // Lista de contenidos filtrados que se muestra
  contenidosFiltrados: Contenido[] = [];
  
  // Término de búsqueda
  terminoBusqueda: string = '';
  
  mostrarFormulario = false;
  contenidoEditar: Contenido | null = null; // contenido a editar
  
  // Indicadores de estado
  cargando: boolean = false;
  error: string | null = null;

  constructor(private contenidoService: ContenidoService) { }

  ngOnInit(): void {
    this.cargarContenidos();
  }

  // Método para cargar los contenidos desde el servicio
  cargarContenidos(): void {
    this.cargando = true;
    this.error = null;
    
    this.contenidoService.getContenidos().subscribe({
      next: (contenidos) => {
        this.contenidos = contenidos;
        this.contenidosFiltrados = [...this.contenidos];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los contenidos:', err);
        this.error = 'No se pudieron cargar los contenidos. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  // Método para filtrar contenidos según el término de búsqueda
  filtrarContenidos(): void {
    if (!this.terminoBusqueda.trim()) {
      // Si no hay término de búsqueda, mostrar todos los contenidos
      this.contenidosFiltrados = [...this.contenidos];
    } else {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      this.contenidosFiltrados = this.contenidos.filter(contenido => 
        contenido.descripcion.toLowerCase().includes(termino)
      );
    }
  }

  // Método para editar contenido
  editarContenido(contenido: Contenido): void {
    this.contenidoEditar = { ...contenido }; // Copia los datos del contenido para edición
    this.mostrarFormulario = true; // Mostrar el formulario
  }

  abrirFormulario() {
    this.contenidoEditar = null;
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.contenidoEditar = null;
  }

  agregarNuevoContenido(nuevoContenido: Contenido) {
    // Ya no necesitamos manejar aquí la lógica de agregar/actualizar
    // porque el componente de contenidosAddComponent ya lo hace a través del servicio
    
    // Simplemente volvemos a cargar los contenidos después de agregar/actualizar
    this.cargarContenidos();
    this.cerrarFormulario();
  }

  // Método para manejar la eliminación de un contenido
  manejarContenidoEliminado(id: number): void {
    this.contenidoService.deleteContenido(id).subscribe({
      next: () => {
        // Actualizar la lista después de eliminar
        this.cargarContenidos();
      },
      error: (err) => {
        console.error('Error al eliminar el contenido:', err);
        // Opcional: Mostrar mensaje de error
      }
    });
  }

  // Función trackBy para mejorar el rendimiento
  trackById(index: number, contenido: Contenido): number {
    return contenido.id; // Devolver el id como identificador único para cada contenido
  }
}