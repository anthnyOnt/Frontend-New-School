import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfesorComponent } from './profesor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProfesorService } from '../../services/profesor/profesor.service';
import { Profesor } from '../../../core/interfaces/profesor';
import { RouterTestingModule } from '@angular/router/testing'; // <-- ✅ agregado

describe('ProfesorComponent', () => {
  let component: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;
  let profesorService: jasmine.SpyObj<ProfesorService>;

  const profesoresMock: Profesor[] = [
    {
      id: 1,
      nombre: 'Ana',
      fechaNacimiento: new Date('1990-01-01'),
      nacionalidad: 'Boliviana',
      correo: 'ana@ucb.edu.bo',
      telefono: '12345678',
      direccion: 'Av. Siempre Viva',
      rol: 'Docente',
      ci: '1234567'
    },
    {
      id: 2,
      nombre: 'Luis',
      fechaNacimiento: new Date('1985-05-12'),
      nacionalidad: 'Boliviana',
      correo: 'luis@ucb.edu.bo',
      telefono: '87654321',
      direccion: 'Calle Falsa 123',
      rol: 'Docente',
      ci: '7654321'
    }
  ];

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ProfesorService', ['getProfesores', 'deleteProfesor']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ProfesorComponent], // <-- ✅ corregido
      providers: [{ provide: ProfesorService, useValue: spy }]
    }).compileComponents();

    profesorService = TestBed.inject(ProfesorService) as jasmine.SpyObj<ProfesorService>;
    profesorService.getProfesores.and.returnValue(of(profesoresMock));

    fixture = TestBed.createComponent(ProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load profesores on init', () => {
    expect(component.profesores.length).toBe(2);
    expect(component.profesores[0].nombre).toBe('Ana');
  });

  it('should call deleteProfesor and remove the profesor from the list', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    profesorService.deleteProfesor.and.returnValue(of(void 0));

    const initialLength = component.profesores.length;
    component.eliminarProfesor(profesoresMock[0]);

    expect(profesorService.deleteProfesor).toHaveBeenCalledWith(profesoresMock[0].id);
    expect(component.profesores.length).toBe(initialLength - 1);
  });

  it('should track profesor by ID', () => {
    const trackResult = component.trackById(0, profesoresMock[0]);
    expect(trackResult).toBe(profesoresMock[0].id);
  });
});
