import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradoComponent } from './grado.component';
import { GradoService } from '../../services/grado/grado.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Grado } from '../../../core/interfaces/grado';
import { By } from '@angular/platform-browser';

describe('GradoComponent', () => {
  let component: GradoComponent;
  let fixture: ComponentFixture<GradoComponent>;
  let mockGrado: Grado;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradoComponent, HttpClientTestingModule],
      providers: [GradoService],
    }).compileComponents();

    fixture = TestBed.createComponent(GradoComponent);
    component = fixture.componentInstance;

    mockGrado = {
      id: 1,
      descripcion: 'Grado de Prueba',
      primaria_secundaria: true
    };

    component.grado = mockGrado;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la descripción del grado', () => {
    const gradoElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(gradoElement.textContent).toContain(mockGrado.descripcion);
  });

  it('debería mostrar "Secundaria" si primaria_secundaria es true', () => {
    component.grado.primaria_secundaria = true;
    fixture.detectChanges();
    const tipo = component.getTipoGrado();
    expect(tipo).toBe('Secundaria');
  });

  it('debería mostrar "Primaria" si primaria_secundaria es false', () => {
    component.grado.primaria_secundaria = false;
    fixture.detectChanges();
    const tipo = component.getTipoGrado();
    expect(tipo).toBe('Primaria');
  });

  it('debería alternar la visibilidad del dropdown', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeTrue();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('debería emitir el grado al hacer click en onEdit()', () => {
    spyOn(component.gradoEditar, 'emit');
    component.onEdit();
    expect(component.gradoEditar.emit).toHaveBeenCalledWith(mockGrado);
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('debería emitir el id del grado al hacer click en eliminarGrado()', () => {
    spyOn(component.gradoEliminado, 'emit');
    component.eliminarGrado();
    expect(component.gradoEliminado.emit).toHaveBeenCalledWith(mockGrado.id);
  });
});
