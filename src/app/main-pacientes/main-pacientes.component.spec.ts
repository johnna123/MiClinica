import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPacientesComponent } from './main-pacientes.component';

describe('MainPacientesComponent', () => {
  let component: MainPacientesComponent;
  let fixture: ComponentFixture<MainPacientesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
