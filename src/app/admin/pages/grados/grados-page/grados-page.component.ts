import { Component, OnInit } from '@angular/core';
import { Grado } from '../../../../core/interfaces/grado';
import { GradoComponent } from "../../../components/grado/grado.component";
import { CommonModule } from '@angular/common';
import { GradosAddComponent } from '../grados-add/grados-add.component';


@Component({
  selector: 'app-grados-page',
  standalone: true,
  imports: [GradoComponent, CommonModule,GradosAddComponent],
  templateUrl: './grados-page.component.html',
  styleUrl: './grados-page.component.scss'
})
export class GradosPageComponent implements OnInit {

  
  // Lista de grados filtrados (esto puede venir del backend)
  gradosFiltrados = [
    { id: 1, descripcion: 'Grado 1', primaria_secundaria: true },
    { id: 2, descripcion: 'Grado 2', primaria_secundaria: false },
    { id: 3, descripcion: 'Grado 3', primaria_secundaria: true },
    // Añadir más grados si es necesario
  ];
  mostrarFormulario = false;
 
  gradoEditar!: Grado; // Grado a editar



  constructor() { }


   // Método para editar grado
  editarGrado(grado: Grado): void {
    this.gradoEditar = { ...grado }; // Copia los datos del grado para edición
    this.mostrarFormulario = true; // Mostrar el formulario
    console.log("asadsadsd",this.mostrarFormulario);
  }

  ngOnInit(): void {
    // Aquí puedes cargar los grados desde un servicio, si es necesario
  }

  abrirFormulario() {
    // Aquí puedes redirigir a una nueva página o abrir un modal para agregar un grado
    this.mostrarFormulario=true;
    // Lógica para mostrar el formulario de grado
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    
  }

  agregarNuevoGrado(nuevoGrado: Grado) {
    this.gradosFiltrados.push(nuevoGrado);
    this.cerrarFormulario();
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
