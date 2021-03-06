import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewApointmentFormComponent } from './new-apointment-form.component';

describe('NewApointmentFormComponent', () => {
  let component: NewApointmentFormComponent;
  let fixture: ComponentFixture<NewApointmentFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApointmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
