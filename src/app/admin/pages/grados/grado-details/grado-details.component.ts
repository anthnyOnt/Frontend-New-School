import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GradoService } from '../../../services/grado/grado.service';
import { InscripcionService } from '../../../services/inscripcion/inscripcion.service';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { Inscripcion } from '../../../../core/interfaces/inscripcion';
import { Grado } from '../../../../core/interfaces/grado';
import { Curso } from '../../../../core/interfaces/curso';

@Component({
  selector: 'app-grado-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './grado-details.component.html',
  styleUrl: './grado-details.component.scss'
})
export class GradoDetailsComponent implements OnInit {
  gradoId: number = 0;
  grado: Grado | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  activeTab: number = 0;
  
  inscripcion: Inscripcion | null = null;
  inscripciones: any; 
  availableStudents: any; 
  showingAddStudentForm: boolean = false;
  selectedStudentId: string = '';
  
  courses: Curso[] = [];

  constructor(
    private route: ActivatedRoute,
    private gradoService: GradoService,
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.gradoId = +params['id'];
        this.loadGradoDetails();
      } else {
        this.error = 'ID de grado no encontrado';
        this.loading = false;
      }
    });
  }

  loadGradoDetails(): void {
    this.loading = true;
    this.error = null;
  
    this.gradoService.getGradoById(this.gradoId).subscribe({
      next: (data) => {
        this.grado = data;
        this.loading = false;
        this.loadStudents();
        this.loadCourses();
      },
      error: (error) => {
        this.error = 'Error al cargar los detalles del grado';
        console.error(error);
        this.loading = false;
      }
    });
  }

  loadStudents(): void {
    this.inscripciones = [];
    this.availableStudents = [];
  
    this.inscripcionService.getInscripcionesByGradoId(this.gradoId).subscribe({
      next: (inscripciones) => {
        this.inscripciones = inscripciones;
      },
      error: (error) => {
        console.error('Error loading inscriptions:', error);
      }
    });
    this.estudianteService.getEstudiantes().subscribe({
      next: (estudiantes) => {
        this.availableStudents = estudiantes;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  loadCourses(): void {
    this.courses = [
      {
        id: 1,
        nombre: 'Matemáticas',
        descripcion: 'Curso básico de matemáticas que cubre álgebra, geometría y estadística.',
        fechaCreacion: new Date(),
        gradoId: this.gradoId,
        profesorId: 1
      },
      {
        id: 2,
        nombre: 'Lenguaje',
        descripcion: 'Estudio del español, gramática, literatura y comunicación oral y escrita.',
        fechaCreacion: new Date(),
        gradoId: this.gradoId,
        profesorId: 2
      },
      {
        id: 3,
        nombre: 'Ciencias Naturales',
        descripcion: 'Introducción a la biología, física y química aplicadas al entorno natural.',
        fechaCreacion: new Date(),
        gradoId: this.gradoId,
        profesorId: 3
      }
    ];
  }

  changeTab(index: number): void {
    this.activeTab = index;
  }

  showAddStudentForm(): void {
    this.selectedStudentId = '';
    this.showingAddStudentForm = true;
  }

  hideAddStudentForm(): void {
    this.showingAddStudentForm = false;
  }

  addStudentToGrado(): void {
    if (!this.selectedStudentId) {
      alert('Por favor, seleccione un estudiante');
      return;
    }
    this.inscripcion = {
      id: 0,
      fechaInscripcion: new Date(),
      estudianteId: +this.selectedStudentId,
      gradoId: this.gradoId,
      gestion: 2025
    }

    this.inscripcionService.addInscripcion(this.inscripcion).subscribe({
      next: (response) => {
        console.log('Estudiante agregado correctamente:', response);
        this.inscripciones.push(response);
        this.hideAddStudentForm();
      },
      error: (error) => {
        console.error('Error al agregar estudiante:', error);
        alert('Error al agregar estudiante');
      }
    });
    
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
