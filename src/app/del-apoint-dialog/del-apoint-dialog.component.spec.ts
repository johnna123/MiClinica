import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelApointDialogComponent } from './del-apoint-dialog.component';

describe('DelApointDialogComponent', () => {
  let component: DelApointDialogComponent;
  let fixture: ComponentFixture<DelApointDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelApointDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelApointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
