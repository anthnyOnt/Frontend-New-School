import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoFormComponent } from './curso-form.component';
import { CursoService } from '../../../services/curso/curso.service';
import { Curso } from '../../../../core/interfaces/curso';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CursoFormComponent', () => {
  let component: CursoFormComponent;
  let fixture: ComponentFixture<CursoFormComponent>;
  let mockCursoService: jasmine.SpyObj<CursoService>;

  const cursoEditarMock: Curso = {
    id: 1,
    nombre: 'Física',
    descripcion: 'Curso de física básica',
    gradoId: 1,
    fechaCreacion: new Date()
  };

  beforeEach(async () => {
    mockCursoService = jasmine.createSpyObj('CursoService', ['addCurso', 'updateCurso']);

    await TestBed.configureTestingModule({
      imports: [CursoFormComponent, HttpClientTestingModule],
      providers: [{ provide: CursoService, useValue: mockCursoService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cursoEditar and call resetForm on ngOnChanges', () => {
    component.cursoEditar = cursoEditarMock;
    component.ngOnChanges();

    expect(component.curso.id).toBe(cursoEditarMock.id);
    expect(component.curso.nombre).toBe(cursoEditarMock.nombre);
  });

  it('should emit cursoAgregado and cerrar when adding new curso', () => {
    const newCurso: Curso = {
      id: 2,
      nombre: 'Química',
      descripcion: 'Curso de química general',
      fechaCreacion: new Date(),
      gradoId: 2
    };

    component.cursoEditar = null;
    component.curso = newCurso;

    spyOn(component.cursoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    mockCursoService.addCurso.and.returnValue(of(newCurso));
    component.guardarCurso();

    expect(mockCursoService.addCurso).toHaveBeenCalledWith(newCurso);
    expect(component.cursoAgregado.emit).toHaveBeenCalledWith(newCurso);
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should emit cursoAgregado and cerrar when editing curso', () => {
    const updatedCurso: Curso = {
      ...cursoEditarMock,
      nombre: 'Física Avanzada'
    };

    component.cursoEditar = updatedCurso;
    component.ngOnChanges();
    spyOn(component.cursoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    mockCursoService.updateCurso.and.returnValue(of(updatedCurso));
    component.guardarCurso();

    expect(mockCursoService.updateCurso).toHaveBeenCalledWith(updatedCurso);
    expect(component.cursoAgregado.emit).toHaveBeenCalledWith(updatedCurso);
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should track curso by ID', () => {
    const curso: Curso = { ...cursoEditarMock };
    expect(component.trackById(0, curso)).toBe(curso.id);
  });
});
