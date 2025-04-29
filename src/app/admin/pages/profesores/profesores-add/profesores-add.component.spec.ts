import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorAddComponent } from './profesores-add.component';

describe('ProfesoresAddComponent', () => {
  let component: ProfesorAddComponent;
  let fixture: ComponentFixture<ProfesorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});