import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatApsComponent } from './pat-aps.component';

describe('PatApsComponent', () => {
  let component: PatApsComponent;
  let fixture: ComponentFixture<PatApsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatApsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatApsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
