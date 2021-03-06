import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelConfirmDialogComponent } from './del-confirm-dialog.component';

describe('DelConfirmDialogComponent', () => {
  let component: DelConfirmDialogComponent;
  let fixture: ComponentFixture<DelConfirmDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
