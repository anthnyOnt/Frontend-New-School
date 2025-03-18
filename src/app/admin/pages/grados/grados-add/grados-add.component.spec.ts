import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosAddComponent } from './grados-add.component';

describe('GradosAddComponent', () => {
  let component: GradosAddComponent;
  let fixture: ComponentFixture<GradosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradosAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
