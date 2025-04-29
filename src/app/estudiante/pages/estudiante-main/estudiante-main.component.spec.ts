import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteMainComponent } from './estudiante-main.component';

describe('EstudianteMainComponent', () => {
  let component: EstudianteMainComponent;
  let fixture: ComponentFixture<EstudianteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudianteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
