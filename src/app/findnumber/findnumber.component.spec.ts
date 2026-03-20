import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindnumberComponent } from './findnumber.component';

describe('FindnumberComponent', () => {
  let component: FindnumberComponent;
  let fixture: ComponentFixture<FindnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindnumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
