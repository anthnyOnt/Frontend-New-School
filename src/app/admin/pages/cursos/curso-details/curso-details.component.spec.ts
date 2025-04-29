import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoDetailsComponent } from './curso-details.component';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../services/curso/curso.service';
import { ContenidoService } from '../../../services/contenido/contenido.service';
import { of } from 'rxjs';
import { Curso } from '../../../../core/interfaces/curso';
import { Contenido } from '../../../../core/interfaces/contenido';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CursoDetailsComponent', () => {
  let component: CursoDetailsComponent;
  let fixture: ComponentFixture<CursoDetailsComponent>;

  const mockCurso: Curso = {
    id: 1,
    nombre: 'Matemáticas',
    descripcion: 'Curso de matemáticas básicas',
    gradoId: 2,
    fechaCreacion: new Date()
  };

  const mockContenidos: Contenido[] = [
    {
      id: 1,
      titulo: 'Álgebra',
      descripcion: 'Introducción al álgebra',
      tipo: 'Teoría',
      url: 'http://ejemplo.com/algebra',
      fechaCreacion: new Date(),
      cursoId: 1
    },
    {
      id: 2,
      titulo: 'Geometría',
      descripcion: 'Conceptos básicos de geometría',
      tipo: 'Práctica',
      url: 'http://ejemplo.com/geometria',
      fechaCreacion: new Date(),
      cursoId: 1
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDetailsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: CursoService,
          useValue: {
            getCursoById: () => of(mockCurso)
          }
        },
        {
          provide: ContenidoService,
          useValue: {
            getContenidosByCursoId: () => of(mockContenidos),
            deleteContenido: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load curso and contenidos on init', () => {
    expect(component.curso).toEqual(mockCurso);
    expect(component.contenidos).toEqual(mockContenidos);
  });

  it('should filter contents by id with trackById', () => {
    const contenido = mockContenidos[0];
    expect(component.trackById(0, contenido)).toBe(contenido.id);
  });

  it('should handle contenidoEliminado properly', () => {
    const deleteSpy = spyOn(
      TestBed.inject(ContenidoService),
      'deleteContenido'
    ).and.callThrough();

    component.manejarContenidoEliminado(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
