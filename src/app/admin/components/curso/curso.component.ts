import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { CursoService } from '../../services/curso/curso.service';
import { CommonModule } from '@angular/common';
import { CursoCompleto } from '../../../core/interfaces/curso-completo';
import { Curso } from '../../../core/interfaces/curso';
import { Router, RouterLink, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent implements OnInit{
  @Input() curso!: Curso;  
  @Input() gradoDescripcion?: string;
  @Output() cursoEliminado = new EventEmitter<number>();  
  @Output() cursoEditar = new EventEmitter<CursoCompleto>();
  isDropdownVisible = false;

  isAdmin = localStorage.getItem('rol') === 'ADMIN' ? false : true;

  cursoCompleto!: CursoCompleto;

  constructor(private CursoService: CursoService, private router: Router, private route: ActivatedRoute) {}

  verCurso(curso: Curso): void {
    const currentUrl = this.router.url;
    if(currentUrl.includes('cursos')){
      this.router.navigate([curso.id], {
        relativeTo: this.route,
        state: { curso }
      });
    } else {
      this.router.navigate(['cursos', curso.id], {
        relativeTo: this.route,
        state: { curso }
      })
    }
  }
  
  ngOnInit(): void {
    console.log("Curso component inicializado")
    console.log(this.isAdmin)
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onEdit(): void {
    console.log('Editar Curso', this.curso.id);
    console.log("Curso: ",this.curso);
    this.isDropdownVisible = false;
    console.log(this.cursoEditar.emit(this.curso)); 
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el Curso ${this.curso.nombre}?`)) {
      this.CursoService.deleteCurso(this.curso.id).subscribe({
        next: () => {
          console.log('Curso eliminado correctamente');
          this.cursoEliminado.emit(this.curso.id); 
        },
        error: (error) => {
          console.error('Error al eliminar Curso:', error);
        }
      });
    }
  }

  eliminarCurso(): void {
    this.cursoEliminado.emit(this.curso.id);
  }
}
