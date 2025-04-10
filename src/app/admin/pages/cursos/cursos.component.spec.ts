import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { CursoService } from '../../services/curso/curso.service';
import { of, throwError } from 'rxjs';
import { Curso } from '../../../core/interfaces/curso';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CursoComponent } from '../../components/curso/curso.component';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let mockCursoService: jasmine.SpyObj<CursoService>;

  const mockCursos: Curso[] = [
    { id: 1, nombre: 'Angular Básico', descripcion: 'Curso introductorio',fechaCreacion: new Date(), gradoId: 1 },
    { id: 2, nombre: 'Angular Avanzado', descripcion: 'Curso avanzado', fechaCreacion: new Date(), gradoId: 2 }
  ];

  beforeEach(async () => {
    mockCursoService = jasmine.createSpyObj('CursoService', ['getCursos', 'deleteCurso']);

    await TestBed.configureTestingModule({
      imports: [
        CursosComponent,
        CursoComponent,
        CursoFormComponent,
        FormsModule,
        RouterLink,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CursoService, useValue: mockCursoService },
        { provide: ActivatedRoute, useValue: { params: of({}), snapshot: {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cursos on init', () => {
    mockCursoService.getCursos.and.returnValue(of(mockCursos));
    fixture.detectChanges(); // triggers ngOnInit

    expect(mockCursoService.getCursos).toHaveBeenCalled();
    expect(component.cursos.length).toBe(2);
    expect(component.cursosFiltrados.length).toBe(2);
    expect(component.cargando).toBeFalse();
  });

  it('should handle error when loading cursos fails', () => {
    mockCursoService.getCursos.and.returnValue(throwError(() => new Error('Error')));
    fixture.detectChanges();

    expect(component.error).toContain('No se pudieron cargar');
    expect(component.cargando).toBeFalse();
  });

  it('should filter cursos based on terminoBusqueda', () => {
    component.cursos = mockCursos;

    component.terminoBusqueda = 'introductorio';
    component.filtrarCursos();
    expect(component.cursosFiltrados.length).toBe(1);

    component.terminoBusqueda = '';
    component.filtrarCursos();
    expect(component.cursosFiltrados.length).toBe(2);
  });

  it('should open form to add a new course', () => {
    component.abrirFormulario();
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.cursoEditar).toBeNull();
  });

  it('should set cursoEditar and open form on editarCurso', () => {
    const cursoToEdit = mockCursos[0];
    component.editarCurso(cursoToEdit);
    expect(component.cursoEditar).toEqual(cursoToEdit);
    expect(component.mostrarFormulario).toBeTrue();
  });

  it('should close form and reset state on cerrarFormulario', () => {
    component.cursoEditar = mockCursos[0];
    component.mostrarFormulario = true;

    component.cerrarFormulario();
    expect(component.mostrarFormulario).toBeFalse();
    expect(component.cursoEditar).toBeNull();
  });

  it('should reload cursos after agregarNuevoCurso', () => {
    spyOn(component, 'cargarCursos');
    component.agregarNuevoCurso(mockCursos[0]);
    expect(component.cargarCursos).toHaveBeenCalled();
    expect(component.mostrarFormulario).toBeFalse();
  });

  // it('should delete curso and reload on manejarCursoEliminado', () => {
  //   mockCursoService.deleteCurso.and.returnValue(of({}));
  //   spyOn(component, 'cargarCursos');
    
  //   component.manejarCursoEliminado(1);
  //   expect(mockCursoService.deleteCurso).toHaveBeenCalledWith(1);
  //   expect(component.cargarCursos).toHaveBeenCalled();
  // });

  it('should handle error on curso delete fail', () => {
    mockCursoService.deleteCurso.and.returnValue(throwError(() => new Error('Delete failed')));
    spyOn(console, 'error');
    component.manejarCursoEliminado(99);
    expect(console.error).toHaveBeenCalledWith('Error al eliminar el grado:', jasmine.any(Error));
  });

  it('should return curso id on trackById', () => {
    const id = component.trackById(0, mockCursos[1]);
    expect(id).toBe(2);
  });
});
