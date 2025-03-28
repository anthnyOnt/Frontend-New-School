import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoComponent } from './grado.component';

describe('GradoComponent', () => {
  let component: GradoComponent;
  let fixture: ComponentFixture<GradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
