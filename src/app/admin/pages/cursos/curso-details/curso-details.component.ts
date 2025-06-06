import { Component, OnInit } from '@angular/core';
import { Contenido } from '../../../../core/interfaces/contenido';
import { Curso } from '../../../../core/interfaces/curso';
import { CursoService } from '../../../services/curso/curso.service';
import { ContenidoService } from '../../../services/contenido/contenido.service'; 
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router, ActivatedRoute} from '@angular/router';
import { ContenidoComponent } from "../../../components/contenido/contenido.component";
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { Profesor } from '../../../../core/interfaces/profesor';

@Component({
  selector: 'app-curso-details',
  standalone: true,
  imports: [ContenidoComponent, ContenidoComponent, CommonModule],
  templateUrl: './curso-details.component.html',
  styleUrl: './curso-details.component.scss'
})
export class CursoDetailsComponent implements OnInit{
  curso!: Curso;
  contenidos?: Contenido [];
  profesor!: Profesor

  constructor(private route: ActivatedRoute, private router: Router, private cursoService: CursoService, private contenidoService: ContenidoService, private profesorService: ProfesorService) {}

  volver(curso: Curso): void{
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    const cursoId = this.route.snapshot.paramMap.get('cursoId'); // OBTENER ID DE LA URL
    this.cursoService.getCursoById(Number(cursoId)).subscribe({
      next: (curso) => {
        this.curso = curso
        this.profesorService.getProfesorById(this.curso.docenteId).subscribe({
          next: (profesor) => {
            this.profesor = profesor
          }
        })
        this.cargarContenidos()
      },
      error: (err) => console.error('Error al obtener curso:', err)
    });
  }

  cargarContenidos(){
    this.contenidoService.getContenidosByCursoId(this.curso.id).subscribe({
      next: (contenidos) => {
        this.contenidos = contenidos
      },
      error: (err) => {
        console.log("Error al cargar los contenidos ", err)      
      }
    })
  }

  // Lista de contenidos filtrados que se muestra
  contenidosFiltrados: Contenido[] = [];
  
  // Término de búsqueda
  terminoBusqueda: string = '';


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
