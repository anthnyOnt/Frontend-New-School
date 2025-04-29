import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoComponent } from './curso.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Curso } from '../../../core/interfaces/curso';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;

  const mockCurso: Curso = {
    id: 1,
    nombre: 'Matemáticas',
    descripcion: 'Curso de matemáticas básicas',
    fechaCreacion: new Date('2024-01-01'),
    gradoId: 101
  };

  beforeEach(async () => {
    mockCursoService = jasmine.createSpyObj('CursoService', ['deleteCurso']);
    mockGradoService = jasmine.createSpyObj('GradoService', ['getGradoById']);

    await TestBed.configureTestingModule({
      imports: [CursoComponent, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;
    component.curso = mockCurso;
    component.gradoDescripcion = 'Primero Básico';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name', () => {
    const nombre = fixture.debugElement.query(By.css('.curso-title')).nativeElement;
    expect(nombre.textContent).toContain('Matemáticas');
  });

  it('should display course description', () => {
    const descripcion = fixture.debugElement.query(By.css('.curso-descripcion')).nativeElement;
    expect(descripcion.textContent).toContain('Curso de matemáticas básicas');
  });

  it('should display gradoDescripcion', () => {
    const grado = fixture.debugElement.query(By.css('.curso-grado')).nativeElement;
    expect(grado.textContent).toContain('Primero Básico');
  });

  it('should toggle dropdown', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeTrue();
  });

  it('should emit cursoEditar when onEdit is called', () => {
    spyOn(component.cursoEditar, 'emit');
    component.onEdit();
    expect(component.cursoEditar.emit).toHaveBeenCalledWith(mockCurso);
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should emit cursoEliminado when eliminarCurso is called', () => {
    spyOn(component.cursoEliminado, 'emit');
    component.eliminarCurso();
    expect(component.cursoEliminado.emit).toHaveBeenCalledWith(mockCurso.id);
  });
});
