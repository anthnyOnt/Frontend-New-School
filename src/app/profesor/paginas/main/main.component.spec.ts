import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorMainComponent } from './main.component';

describe('ProfesorMainComponent', () => {
  let component: ProfesorMainComponent;
  let fixture: ComponentFixture<ProfesorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
