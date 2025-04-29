import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GradosAddComponent } from './grados-add.component';
import { GradoService } from '../../../services/grado/grado.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Grado } from '../../../../core/interfaces/grado';

describe('GradosAddComponent', () => {
  let component: GradosAddComponent;
  let fixture: ComponentFixture<GradosAddComponent>;
  let mockGradoService: jasmine.SpyObj<GradoService>;

  const gradoMock: Grado = {
    id: 1,
    descripcion: 'Primero de primaria',
    primaria_secundaria: true
  };

  beforeEach(async () => {
    mockGradoService = jasmine.createSpyObj('GradoService', ['addGrado', 'updateGrado']);
    mockGradoService.addGrado.and.returnValue(of(gradoMock));
    mockGradoService.updateGrado.and.returnValue(of(gradoMock));

    await TestBed.configureTestingModule({
      imports: [GradosAddComponent, FormsModule],
      providers: [
        { provide: GradoService, useValue: mockGradoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GradosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default grado if gradoEditar is null', () => {
    expect(component.grado.id).toBe(0);
    expect(component.grado.descripcion).toBe('');
    expect(component.grado.primaria_secundaria).toBeTrue();
  });

  it('should load gradoEditar into form when set', () => {
    component.gradoEditar = gradoMock;
    component.ngOnChanges();
    expect(component.grado.descripcion).toBe('Primero de primaria');
  });

  it('should call addGrado when creating new grado', fakeAsync(() => {
    spyOn(component.gradoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    component.gradoEditar = null;
    component.grado = { id: 0, descripcion: 'Nuevo Grado', primaria_secundaria: true };
    component.guardarGrado();
    tick();

    expect(mockGradoService.addGrado).toHaveBeenCalled();
    expect(component.gradoAgregado.emit).toHaveBeenCalled();
    expect(component.cerrar.emit).toHaveBeenCalled();
  }));

  it('should call updateGrado when editing existing grado', fakeAsync(() => {
    spyOn(component.gradoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');

    component.gradoEditar = gradoMock;
    component.grado = { ...gradoMock };
    component.guardarGrado();
    tick();

    expect(mockGradoService.updateGrado).toHaveBeenCalled();
    expect(component.gradoAgregado.emit).toHaveBeenCalled();
    expect(component.cerrar.emit).toHaveBeenCalled();
  }));
});