import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresAddComponent } from './profesores-add.component';

describe('ProfesoresAddComponent', () => {
  let component: ProfesoresAddComponent;
  let fixture: ComponentFixture<ProfesoresAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
