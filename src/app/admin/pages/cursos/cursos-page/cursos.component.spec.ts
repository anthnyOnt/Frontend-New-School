import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { CursoService } from '../../../services/curso/curso.service';
import { GradoService } from '../../../services/grado/grado.service';
import { Curso } from '../../../../core/interfaces/curso';
import { Grado } from '../../../../core/interfaces/grado';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let mockCursoService: jasmine.SpyObj<CursoService>;
  let mockGradoService: jasmine.SpyObj<GradoService>;

  const cursosMock: Curso[] = [
    { id: 1, nombre: 'Matemáticas', descripcion: 'Curso de matemáticas', fechaCreacion: new Date(), gradoId: 1 },
    { id: 2, nombre: 'Biología', descripcion: 'Curso de biología', fechaCreacion: new Date(), gradoId: 2 }
  ];

  const gradosMock: Grado[] = [
    { id: 1, descripcion: 'Primero', primaria_secundaria: true },
    { id: 2, descripcion: 'Segundo', primaria_secundaria: true }
  ];

  beforeEach(async () => {
    mockCursoService = jasmine.createSpyObj('CursoService', ['getCursos', 'deleteCurso']);
    mockGradoService = jasmine.createSpyObj('GradoService', ['getGrados']);

    await TestBed.configureTestingModule({
      imports: [CursosComponent, HttpClientTestingModule],
      providers: [
        { provide: CursoService, useValue: mockCursoService },
        { provide: GradoService, useValue: mockGradoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cursos and grados on init', fakeAsync(() => {
    mockCursoService.getCursos.and.returnValue(of(cursosMock));
    mockGradoService.getGrados.and.returnValue(of(gradosMock));

    component.ngOnInit();
    tick();

    expect(component.cursos.length).toBe(2);
    expect(component.cursosFiltrados.length).toBe(2);
    expect(component.gradosMap.get(1)).toBe('Primero');
    expect(component.cargando).toBeFalse();
  }));

  it('should handle error on cursos loading', fakeAsync(() => {
    mockCursoService.getCursos.and.returnValue(throwError(() => new Error('Error cargando')));
    component.cargarDatos();
    tick();

    expect(component.error).toContain('No se pudieron cargar los cursos');
    expect(component.cargando).toBeFalse();
  }));

  it('should filter cursos by search term', () => {
    component.cursos = cursosMock;
    component.terminoBusqueda = 'bio';
    component.filtrarCursos();
    expect(component.cursosFiltrados.length).toBe(1);
    expect(component.cursosFiltrados[0].nombre).toBe('Biología');
  });

  it('should reset filter when search term is empty', () => {
    component.cursos = cursosMock;
    component.terminoBusqueda = '';
    component.filtrarCursos();
    expect(component.cursosFiltrados.length).toBe(2);
  });

  it('should call deleteCurso and reload data', fakeAsync(() => {
    mockCursoService.getCursos.and.returnValue(of(cursosMock));
    mockGradoService.getGrados.and.returnValue(of(gradosMock));
    mockCursoService.deleteCurso.and.returnValue(of(void 0));

    spyOn(component, 'cargarDatos').and.callThrough();
    component.manejarCursoEliminado(1);
    tick();

    expect(mockCursoService.deleteCurso).toHaveBeenCalledWith(1);
    expect(component.cargarDatos).toHaveBeenCalled();
  }));

  it('should set cursoEditar and mostrarFormulario when editarCurso is called', () => {
    component.editarCurso(cursosMock[0]);
    expect(component.cursoEditar?.id).toBe(1);
    expect(component.mostrarFormulario).toBeTrue();
  });

  it('should open and close form correctly', () => {
    component.abrirFormulario();
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.cursoEditar).toBeNull();

    component.cerrarFormulario();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('should track curso by ID', () => {
    const id = component.trackById(0, cursosMock[0]);
    expect(id).toBe(1);
  });
});
