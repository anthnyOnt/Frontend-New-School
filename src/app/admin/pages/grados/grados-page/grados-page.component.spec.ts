import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosPageComponent } from './grados-page.component';

describe('GradosPageComponent', () => {
  let component: GradosPageComponent;
  let fixture: ComponentFixture<GradosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
