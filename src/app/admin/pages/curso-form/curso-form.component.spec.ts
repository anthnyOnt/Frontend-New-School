import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoFormComponent } from './curso-form.component';

describe('CursoFormComponent', () => {
  let component: CursoFormComponent;
  let fixture: ComponentFixture<CursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
