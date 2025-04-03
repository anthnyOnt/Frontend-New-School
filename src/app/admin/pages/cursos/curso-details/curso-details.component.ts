import { Component, Input, OnInit } from '@angular/core';
import { Contenido } from '../../../../core/interfaces/contenido';
import { Curso } from '../../../../core/interfaces/curso';
import { ContenidosPageComponent } from '../../contenidos/contenidos-page/contenidos-page.component';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../services/curso/curso.service';
import { ContenidoService } from '../../../services/contenido/contenido.service'; 
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-details',
  standalone: true,
  imports: [ContenidosPageComponent, DatePipe, RouterLink],
  templateUrl: './curso-details.component.html',
  styleUrl: './curso-details.component.scss'
})
export class CursoDetailsComponent implements OnInit{
  curso!: Curso;
  contenidos?: Contenido [];

  constructor(private route: ActivatedRoute, private cursoService: CursoService, private contenidoService: ContenidoService) {}

  ngOnInit(): void {
    const cursoId = this.route.snapshot.paramMap.get('id'); // OBTENER ID DE LA URL
    this.cursoService.getCursoById(Number(cursoId)).subscribe({
      next: (curso) => {
        this.curso = curso
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
}

