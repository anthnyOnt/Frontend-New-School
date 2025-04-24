import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoComponent } from './contenido.component';
import { Contenido } from '../../../core/interfaces/contenido';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContenidoComponent', () => {
  let component: ContenidoComponent;
  let fixture: ComponentFixture<ContenidoComponent>;

  const mockContenido: Contenido = {
    id: 1,
    titulo: 'Curso Angular',
    tipo: 'Video',
    descripcion: 'Aprende Angular desde cero',
    fechaCreacion: new Date('2025-04-10'),
    url: 'https://curso-angular.com',
    cursoId: 101
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContenidoComponent,
        HttpClientTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContenidoComponent);
    component = fixture.componentInstance;
    component.contenido = mockContenido;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render contenido data in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.contenido-title')?.textContent).toContain('Curso Angular');
    expect(compiled.querySelector('.contenido-tipo')?.textContent).toContain('Video');
    expect(compiled.querySelector('.contenido-description')?.textContent).toContain('Aprende Angular desde cero');
    expect(compiled.querySelector('.contenido-url')?.getAttribute('href')).toBe('https://curso-angular.com');
  });

  it('should emit contenidoEliminado when eliminarContenido is called', () => {
    spyOn(component.contenidoEliminado, 'emit');
    component.eliminarContenido();
    expect(component.contenidoEliminado.emit).toHaveBeenCalledWith(1);
  });

  it('should trigger eliminarContenido on button click', () => {
    spyOn(component, 'eliminarContenido');
    const button = fixture.debugElement.query(By.css('.eliminar-button'));
    button.triggerEventHandler('click', null);
    expect(component.eliminarContenido).toHaveBeenCalled();
  });
});
