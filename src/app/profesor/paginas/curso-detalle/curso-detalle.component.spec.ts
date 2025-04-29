import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoDetalleComponent } from './curso-detalle.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { ContenidoService } from '../../../admin/services/contenido/contenido.service';
import { TareaService } from '../../../admin/services/tarea/tarea.service';
import { Curso } from '../../../core/interfaces/curso';
import { Contenido } from '../../../core/interfaces/contenido';
import { Tarea } from '../../../core/interfaces/tarea';
import { RouterTestingModule } from '@angular/router/testing';

describe('CursoDetalleComponent', () => {
  let component: CursoDetalleComponent;
  let fixture: ComponentFixture<CursoDetalleComponent>;
  let cursoService: jasmine.SpyObj<CursoService>;
  let contenidoService: jasmine.SpyObj<ContenidoService>;
  let tareaService: jasmine.SpyObj<TareaService>;

  const mockCurso: Curso = {
    id: 1,
    nombre: 'Matemáticas Avanzadas',
    descripcion: 'Curso de álgebra y cálculo avanzado',
    fechaCreacion: new Date('2023-01-15'),
    profesorId: 1,
    gradoId: 1
  };

  const mockContenidos: Contenido[] = [
    {
      id: 1,
      titulo: 'Introducción al Álgebra',
      descripcion: 'Conceptos básicos de álgebra',
      tipo: 'video',
      url: 'https://example.com/algebra-video',
      creacion: new Date('2023-01-20'),
      curso_id: 1
    }
  ];

  const mockTareas: Tarea[] = [
    {
      id: 1,
      titulo: 'Ejercicios de Álgebra',
      descripcion: 'Resolver los problemas 1-10 del capítulo 3',
      fecha_entrega: new Date('2023-02-28'),
      puntaje_max: 20,
      curso_id: 1
    }
  ];

  beforeEach(async () => {
    const cursoServiceSpy = jasmine.createSpyObj('CursoService', ['getCursoById']);
    const contenidoServiceSpy = jasmine.createSpyObj('ContenidoService', ['getContenidosByCursoId']);
    const tareaServiceSpy = jasmine.createSpyObj('TareaService', ['getTareasByCursoId']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CursoDetalleComponent
      ],
      providers: [
        { provide: CursoService, useValue: cursoServiceSpy },
        { provide: ContenidoService, useValue: contenidoServiceSpy },
        { provide: TareaService, useValue: tareaServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    }).compileComponents();

    cursoService = TestBed.inject(CursoService) as jasmine.SpyObj<CursoService>;
    contenidoService = TestBed.inject(ContenidoService) as jasmine.SpyObj<ContenidoService>;
    tareaService = TestBed.inject(TareaService) as jasmine.SpyObj<TareaService>;

    cursoService.getCursoById.and.returnValue(of(mockCurso));
    contenidoService.getContenidosByCursoId.and.returnValue(of(mockContenidos));
    tareaService.getTareasByCursoId.and.returnValue(of(mockTareas));

    fixture = TestBed.createComponent(CursoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load curso details on init', () => {
    expect(component.curso).toEqual(mockCurso);
    expect(cursoService.getCursoById).toHaveBeenCalledWith(1);
  });

  it('should load contenidos for the curso', () => {
    expect(component.contenidos).toEqual(mockContenidos);
    expect(contenidoService.getContenidosByCursoId).toHaveBeenCalledWith(1);
  });

  it('should load tareas for the curso', () => {
    expect(component.tareas).toEqual(mockTareas);
    expect(tareaService.getTareasByCursoId).toHaveBeenCalledWith(1);
  });

  it('should change active tab when cambiarTab is called', () => {
    component.cambiarTab(1);
    expect(component.activeTab).toBe(1);
    
    component.cambiarTab(0);
    expect(component.activeTab).toBe(0);
  });

  it('should return proper icon based on content type', () => {
    expect(component.getTipoIcono('video')).toBe('pi pi-video');
    expect(component.getTipoIcono('documento')).toBe('pi pi-file-pdf');
    expect(component.getTipoIcono('articulo')).toBe('pi pi-book');
    expect(component.getTipoIcono('otro')).toBe('pi pi-file');
  });
});