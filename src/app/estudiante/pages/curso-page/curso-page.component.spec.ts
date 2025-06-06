import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPageComponent } from './curso-page.component';

describe('CursoPageComponent', () => {
  let component: CursoPageComponent;
  let fixture: ComponentFixture<CursoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
