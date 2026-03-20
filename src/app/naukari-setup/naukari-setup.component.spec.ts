import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaukariSetupComponent } from './naukari-setup.component';

describe('NaukariSetupComponent', () => {
  let component: NaukariSetupComponent;
  let fixture: ComponentFixture<NaukariSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaukariSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaukariSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
