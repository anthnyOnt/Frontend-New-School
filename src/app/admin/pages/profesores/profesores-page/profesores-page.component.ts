import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../../core/interfaces/profesor';
import { ProfesorComponent } from "../../../components/profesor/profesor.component";
import { CommonModule } from '@angular/common';
import { ProfesorAddComponent } from '../profesores-add/profesores-add.component';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../../services/profesor/profesor.service';

@Component({
  selector: 'app-profesores-page',
  standalone: true,
  imports: [ProfesorComponent, CommonModule, ProfesorAddComponent, FormsModule],
  templateUrl: './profesores-page.component.html',
  styleUrls: ['./profesores-page.component.scss']
})
export class ProfesoresPageComponent implements OnInit {

  // Lista original de profesores
  profesores: Profesor[] = [];

  // Lista de profesores filtrados que se muestra
  profesoresFiltrados: Profesor[] = [];

  // Término de búsqueda
  terminoBusqueda: string = '';

  mostrarFormulario = false;
  profesorEditar: Profesor | null = null; // Profesor a editar

  // Indicadores de estado
  cargando: boolean = false;
  error: string | null = null;

  constructor(private profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  // Método para cargar los profesores desde el servicio
  cargarProfesores(): void {
    this.cargando = true;
    this.error = null;

    this.profesorService.getProfesores().subscribe({
      next: (profesores) => {
        this.profesores = profesores;
        this.profesoresFiltrados = [...this.profesores];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los profesores:', err);
        this.error = 'No se pudieron cargar los profesores. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  // Método para filtrar profesores según el término de búsqueda
  filtrarProfesores(): void {
    if (!this.terminoBusqueda.trim()) {
      // Si no hay término de búsqueda, mostrar todos los profesores
      this.profesoresFiltrados = [...this.profesores];
    } else {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      this.profesoresFiltrados = this.profesores.filter(profesor => 
        profesor.nombre.toLowerCase().includes(termino) || 
        profesor.nacionalidad.toLowerCase().includes(termino) ||
        profesor.rol.toLowerCase().includes(termino)
      );
    }
  }

  // Método para editar profesor
  editarProfesor(profesor: Profesor): void {
    this.profesorEditar = { ...profesor }; // Copia los datos del profesor para edición
    this.mostrarFormulario = true; // Mostrar el formulario
  }

  abrirFormulario() {
    this.profesorEditar = null;
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.profesorEditar = null;
  }

  agregarNuevoProfesor(nuevoProfesor: Profesor) {
    // Ya no necesitamos manejar aquí la lógica de agregar/actualizar
    // porque el componente de ProfesorAddComponent ya lo hace a través del servicio

    // Simplemente volvemos a cargar los profesores después de agregar/actualizar
    this.cargarProfesores();
    this.cerrarFormulario();
  }

  // Método para manejar la eliminación de un profesor
  manejarProfesorEliminado(id: number): void {
    this.profesorService.deleteProfesor(id).subscribe({
      next: () => {
        // Actualizar la lista después de eliminar
        this.cargarProfesores();
      },
      error: (err) => {
        console.error('Error al eliminar el profesor:', err);
        // Opcional: Mostrar mensaje de error
      }
    });
  }

  // Función trackBy para mejorar el rendimiento
  trackById(index: number, profesor: Profesor): number {
    return profesor.id; // Devolver el id como identificador único para cada profesor
  }
}
