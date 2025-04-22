import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrarEstudianteComponent } from './registrar-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RegistrarEstudianteComponent', () => {
  let component: RegistrarEstudianteComponent;
  let fixture: ComponentFixture<RegistrarEstudianteComponent>;
  let mockEstudianteService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockEstudianteService = {
      addEstudiante: jasmine.createSpy('addEstudiante').and.returnValue(of(void 0))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [RegistrarEstudianteComponent, ReactiveFormsModule],
      providers: [
        { provide: EstudianteService, useValue: mockEstudianteService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.registroForm;
    expect(form).toBeDefined();
    expect(form.valid).toBeFalse();
  });

  it('should mark all controls as touched when form is invalid and submitted', () => {
    component.registrar();
    const formControls = component.registroForm.controls;
    for (const key in formControls) {
      expect(formControls[key].touched).toBeTrue();
    }
  });

  it('should call EstudianteService and navigate on successful registration', fakeAsync(() => {
    component.registroForm.setValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      carnet: '1234567',
      email: 'juan@test.com',
      password: 'Test1234@'
    });

    component.registrar();
    tick();

    expect(mockEstudianteService.addEstudiante).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/estudiantes']);
  }));

  it('should not submit if form is invalid', () => {
    component.registroForm.patchValue({
      nombre: '',
      apellido: '',
      carnet: 'abc',
      email: 'invalido',
      password: '123'
    });

    component.registrar();
    expect(mockEstudianteService.addEstudiante).not.toHaveBeenCalled();
  });
});
