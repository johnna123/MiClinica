import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelApointDialogComponent } from './del-apoint-dialog.component';

describe('DelApointDialogComponent', () => {
  let component: DelApointDialogComponent;
  let fixture: ComponentFixture<DelApointDialogComponent>;

  beforeEach(async(() => {
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
