import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoComponent } from './curso.component';
import { GradoService } from '../../services/grado/grado.service';
import { CursoService } from '../../services/curso/curso.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;

  const mockCurso = {
    id: 1,
    nombre: 'Matemáticas',
    gradoId: 2,
  };

  const mockGrado = {
    id: 2,
    descripcion: 'Grado 5',
    primaria_secundaria: true
  };

  const gradoServiceMock = {
    getGradoById: jasmine.createSpy('getGradoById').and.returnValue(of(mockGrado)),
  };

  const cursoServiceMock = {
    deleteCurso: jasmine.createSpy('deleteCurso').and.returnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoComponent],
      providers: [
        { provide: GradoService, useValue: gradoServiceMock },
        { provide: CursoService, useValue: cursoServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;
    component.curso = mockCurso as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown visibility', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeTrue();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should emit cursoEditar when onEdit is called', () => {
    spyOn(component.cursoEditar, 'emit');
    component.onEdit();
    expect(component.isDropdownVisible).toBeFalse();
    expect(component.cursoEditar.emit).toHaveBeenCalledWith(component.curso);
  });

  it('should emit cursoEliminado when eliminarCurso is called', () => {
    spyOn(component.cursoEliminado, 'emit');
    component.eliminarCurso();
    expect(component.cursoEliminado.emit).toHaveBeenCalledWith(component.curso.id);
  });

  it('should fetch grado on ngOnChanges and set cursoCompleto.grado', () => {
    component.ngOnChanges({});
    expect(gradoServiceMock.getGradoById).toHaveBeenCalledWith(mockCurso.gradoId);
    expect(component.cursoCompleto.grado).toEqual(mockGrado);
  });

})
