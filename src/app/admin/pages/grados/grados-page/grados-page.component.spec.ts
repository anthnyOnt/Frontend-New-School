import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GradosPageComponent } from './grados-page.component';
import { GradoService } from '../../../services/grado/grado.service';
import { of } from 'rxjs';
import { Grado } from '../../../../core/interfaces/grado';

describe('GradosPageComponent', () => {
  let component: GradosPageComponent;
  let fixture: ComponentFixture<GradosPageComponent>;
  let mockGradoService: jasmine.SpyObj<GradoService>;

  const gradosMock: Grado[] = [
    { id: 1, descripcion: 'Primero de primaria', primaria_secundaria: true },
    { id: 2, descripcion: 'Segundo de secundaria', primaria_secundaria: false }
  ];

  beforeEach(async () => {
    mockGradoService = jasmine.createSpyObj('GradoService', ['getGrados', 'deleteGrado']);
    mockGradoService.getGrados.and.returnValue(of(gradosMock));
    mockGradoService.deleteGrado.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [GradosPageComponent],
      providers: [
        { provide: GradoService, useValue: mockGradoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GradosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load grados on init', () => {
    expect(mockGradoService.getGrados).toHaveBeenCalled();
    expect(component.grados.length).toBe(2);
    expect(component.gradosFiltrados.length).toBe(2);
  });

  it('should filter grados by term', () => {
    component.terminoBusqueda = 'primaria';
    component.filtrarGrados();
    expect(component.gradosFiltrados.length).toBe(1);
    expect(component.gradosFiltrados[0].descripcion).toContain('primaria');
  });

  it('should reset filters if search is empty', () => {
    component.terminoBusqueda = '';
    component.filtrarGrados();
    expect(component.gradosFiltrados.length).toBe(component.grados.length);
  });

  it('should call deleteGrado and reload data', fakeAsync(() => {
    spyOn(component, 'cargarGrados');
    component.manejarGradoEliminado(1);
    tick();
    expect(mockGradoService.deleteGrado).toHaveBeenCalledWith(1);
    expect(component.cargarGrados).toHaveBeenCalled();
  }));

  it('should open and close the form correctly', () => {
    component.abrirFormulario();
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.gradoEditar).toBeNull();

    component.cerrarFormulario();
    expect(component.mostrarFormulario).toBeFalse();
    expect(component.gradoEditar).toBeNull();
  });
});
