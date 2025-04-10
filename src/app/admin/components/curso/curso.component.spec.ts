import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoComponent } from './curso.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CursoService } from '../../services/curso/curso.service';
import { GradoService } from '../../services/grado/grado.service';
import { Curso } from '../../../core/interfaces/curso'; // Adjust import paths
import { CursoCompleto } from '../../../core/interfaces/curso-completo'; // Adjust if needed
import { SimpleChange } from '@angular/core';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;
  let mockCursoService: jasmine.SpyObj<CursoService>;
  let mockGradoService: jasmine.SpyObj<GradoService>;

  const mockCurso: Curso = {
    id: 1,
    nombre: 'Curso de Angular',
    descripcion: 'curso de angular',
    fechaCreacion: new Date(),
    gradoId: 101
  };

  const mockGrado = {
    id: 101,
    descripcion: 'Grado 1',
    primaria_secundaria: true
  };

  beforeEach(async () => {
    mockCursoService = jasmine.createSpyObj('CursoService', ['deleteCurso']);
    mockGradoService = jasmine.createSpyObj('GradoService', ['getGradoById']);

    await TestBed.configureTestingModule({
      imports: [CursoComponent, HttpClientTestingModule],
      providers: [
        { provide: CursoService, useValue: mockCursoService },
        { provide: GradoService, useValue: mockGradoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;

    // Provide input data
    component.curso = mockCurso;

    // Mock gradoService return value
    mockGradoService.getGradoById.and.returnValue(of(mockGrado));

    // Trigger lifecycle
    component.ngOnChanges({
      curso: new SimpleChange(null, mockCurso, false)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch grado data on input change', () => {
    expect(mockGradoService.getGradoById).toHaveBeenCalledWith(mockCurso.gradoId);
    expect(component.cursoCompleto.grado).toEqual(mockGrado);
  });

  it('should toggle dropdown', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeTrue();
  });

  it('should emit cursoEditar on edit', () => {
    spyOn(component.cursoEditar, 'emit');
    component.onEdit();
    expect(component.cursoEditar.emit).toHaveBeenCalledWith(mockCurso);
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should not delete if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDelete();
    expect(mockCursoService.deleteCurso).not.toHaveBeenCalled();
  });

  it('should handle gradoService error gracefully', () => {
    mockGradoService.getGradoById.and.returnValue(throwError(() => new Error('error')));
    component.ngOnChanges({
      curso: new SimpleChange(null, mockCurso, false)
    });
    // No crash is a pass in this case
    expect(component.cursoCompleto).toEqual(jasmine.objectContaining({ id: 1 }));
  });
});
