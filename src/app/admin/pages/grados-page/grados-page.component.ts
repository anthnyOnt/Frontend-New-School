import { Component, OnInit } from '@angular/core';
import { Grado } from '../../../core/interfaces/grado';
import { GradoComponent } from "../../components/grado/grado.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grados-page',
  standalone: true,
  imports: [GradoComponent,CommonModule],
  templateUrl: './grados-page.component.html',
  styleUrl: './grados-page.component.scss'
})
export class GradosPageComponent implements OnInit {

  // Lista de grados filtrados (esto puede venir del backend)
  gradosFiltrados = [
    { id: 1, descripcion: 'Grado 1', fecha_anio: 2021, primaria_secundaria: true },
    { id: 2, descripcion: 'Grado 2', fecha_anio: 2022, primaria_secundaria: false },
    { id: 3, descripcion: 'Grado 3', fecha_anio: 2023, primaria_secundaria: true },
    // Añadir más grados si es necesario
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar los grados desde un servicio, si es necesario
  }

  abrirFormulario() {
    // Aquí puedes redirigir a una nueva página o abrir un modal para agregar un grado
    console.log('Abrir formulario para agregar un grado');
    // Lógica para mostrar el formulario de grado
  }
  // Método para manejar la eliminación de un grado
  manejarGradoEliminado(id: number): void {
    // Filtrar la lista de grados eliminando el grado con el id proporcionado
    this.gradosFiltrados = this.gradosFiltrados.filter(grado => grado.id !== id);
  }

  // Función trackBy para mejorar el rendimiento
  trackById(index: number, grado: any): number {
    return grado.id; // Devolver el id como identificador único para cada grado
  }
  

}
