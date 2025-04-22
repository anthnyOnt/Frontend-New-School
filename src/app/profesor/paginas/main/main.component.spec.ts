import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfesorComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainProfesorComponent;
  let fixture: ComponentFixture<MainProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
