import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresPageComponent } from './profesores-page.component';

describe('ProfesoresPageComponent', () => {
  let component: ProfesoresPageComponent;
  let fixture: ComponentFixture<ProfesoresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
