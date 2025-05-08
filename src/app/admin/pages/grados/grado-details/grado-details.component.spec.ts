import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoDetailsComponent } from './grado-details.component';

describe('GradoDetailsComponent', () => {
  let component: GradoDetailsComponent;
  let fixture: ComponentFixture<GradoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
