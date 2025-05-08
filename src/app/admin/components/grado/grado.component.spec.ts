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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar "Secundaria" si primaria_secundaria es true', () => {
    component.grado.primariaSencundaria = true;
    fixture.detectChanges();
    const tipo = component.getTipoGrado();
    expect(tipo).toBe('Secundaria');
  });

  it('debería mostrar "Primaria" si primaria_secundaria es false', () => {
    component.grado.primariaSencundaria = false;
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
});
