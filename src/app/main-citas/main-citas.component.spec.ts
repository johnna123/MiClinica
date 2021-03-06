import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainCitasComponent } from './main-citas.component';

describe('MainCitasComponent', () => {
  let component: MainCitasComponent;
  let fixture: ComponentFixture<MainCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
