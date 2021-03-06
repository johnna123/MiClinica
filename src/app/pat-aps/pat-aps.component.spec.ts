import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatApsComponent } from './pat-aps.component';

describe('PatApsComponent', () => {
  let component: PatApsComponent;
  let fixture: ComponentFixture<PatApsComponent>;

  beforeEach(waitForAsync(() => {
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
