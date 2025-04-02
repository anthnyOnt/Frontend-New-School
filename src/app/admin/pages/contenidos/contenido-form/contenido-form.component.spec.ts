import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoFormComponent } from './contenido-form.component';

describe('ContenidoFormComponent', () => {
  let component: ContenidoFormComponent;
  let fixture: ComponentFixture<ContenidoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
