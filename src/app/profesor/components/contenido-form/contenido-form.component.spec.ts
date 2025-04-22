import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoFormComponent } from './contenido-form.component';
import { FormsModule } from '@angular/forms';
import { ContenidoService } from '../../../admin/services/contenido/contenido.service';
import { of } from 'rxjs';
import { Contenido } from '../../../core/interfaces/contenido';

describe('ContenidoFormComponent', () => {
  let component: ContenidoFormComponent;
  let fixture: ComponentFixture<ContenidoFormComponent>;
  let contenidoServiceSpy: jasmine.SpyObj<ContenidoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContenidoService', ['addContenido', 'updateContenido']);
    
    await TestBed.configureTestingModule({
      imports: [FormsModule, ContenidoFormComponent],
      providers: [
        { provide: ContenidoService, useValue: spy }
      ]
    }).compileComponents();

    contenidoServiceSpy = TestBed.inject(ContenidoService) as jasmine.SpyObj<ContenidoService>;
    fixture = TestBed.createComponent(ContenidoFormComponent);
    component = fixture.componentInstance;
    component.cursoId = 1; // Simular que recibimos un ID de curso
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.contenido.titulo).toBe('');
    expect(component.contenido.descripcion).toBe('');
    expect(component.contenido.tipo).toBe('documento');
    expect(component.contenido.url).toBe('');
    expect(component.contenido.curso_id).toBe(1); // El que pasamos como Input
  });

  it('should populate form when contenidoEditar is provided', () => {
    const mockContenido: Contenido = {
      id: 5,
      titulo: 'Test Contenido',
      descripcion: 'Descripción de prueba',
      tipo: 'video',
      url: 'https://example.com/video',
      creacion: new Date('2025-01-01'),
      curso_id: 2
    };
    
    component.contenidoEditar = mockContenido;
    component.ngOnChanges();
    
    expect(component.contenido).toEqual(mockContenido);
  });

  it('should validate required fields', () => {
    // Espiar el alert global
    spyOn(window, 'alert');
    
    // Form inválido - título vacío
    component.contenido.titulo = '';
    component.contenido.descripcion = 'Descripción';
    component.contenido.url = 'https://example.com';
    
    expect(component.validarFormulario()).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('El título es obligatorio');
    
    // Form inválido - descripción vacía
    component.contenido.titulo = 'Título';
    component.contenido.descripcion = '';
    
    expect(component.validarFormulario()).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('La descripción es obligatoria');
    
    // Form inválido - URL vacía
    component.contenido.descripcion = 'Descripción';
    component.contenido.url = '';
    
    expect(component.validarFormulario()).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('La URL es obligatoria');
    
    // Form inválido - URL mal formateada
    component.contenido.url = 'no-es-url';
    
    expect(component.validarFormulario()).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Por favor, ingrese una URL válida');
    
    // Form válido
    component.contenido.url = 'https://example.com';
    
    expect(component.validarFormulario()).toBeTrue();
  });

  it('should call addContenido when saving new content', () => {
    const newContenido: Contenido = {
      id: 0,
      titulo: 'Nuevo Contenido',
      descripcion: 'Descripción del nuevo contenido',
      tipo: 'documento',
      url: 'https://example.com/doc',
      creacion: new Date(),
      curso_id: 1
    };
    
    component.contenido = newContenido;
    spyOn(component, 'validarFormulario').and.returnValue(true);
    contenidoServiceSpy.addContenido.and.returnValue(of({ ...newContenido, id: 10 }));
    
    spyOn(component.contenidoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');
    
    component.guardarContenido();
    
    expect(contenidoServiceSpy.addContenido).toHaveBeenCalledWith(newContenido);
    expect(component.contenidoAgregado.emit).toHaveBeenCalled();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should call updateContenido when editing existing content', () => {
    const existingContenido: Contenido = {
      id: 5,
      titulo: 'Contenido Existente',
      descripcion: 'Descripción actualizada',
      tipo: 'video',
      url: 'https://example.com/video',
      creacion: new Date(),
      curso_id: 1
    };
    
    component.contenidoEditar = existingContenido;
    component.contenido = { ...existingContenido };
    
    spyOn(component, 'validarFormulario').and.returnValue(true);
    contenidoServiceSpy.updateContenido.and.returnValue(of(existingContenido));
    
    spyOn(component.contenidoAgregado, 'emit');
    spyOn(component.cerrar, 'emit');
    
    component.guardarContenido();
    
    expect(contenidoServiceSpy.updateContenido).toHaveBeenCalledWith(existingContenido);
    expect(component.contenidoAgregado.emit).toHaveBeenCalled();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });
});