import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPadresComponent } from './ver-padres.component';

describe('VerPadresComponent', () => {
  let component: VerPadresComponent;
  let fixture: ComponentFixture<VerPadresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPadresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
