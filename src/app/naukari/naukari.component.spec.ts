import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaukariComponent } from './naukari.component';

describe('NaukariComponent', () => {
  let component: NaukariComponent;
  let fixture: ComponentFixture<NaukariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaukariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaukariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
