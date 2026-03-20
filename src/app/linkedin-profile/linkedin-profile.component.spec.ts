import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinProfileComponent } from './linkedin-profile.component';

describe('LinkedinProfileComponent', () => {
  let component: LinkedinProfileComponent;
  let fixture: ComponentFixture<LinkedinProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedinProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkedinProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
