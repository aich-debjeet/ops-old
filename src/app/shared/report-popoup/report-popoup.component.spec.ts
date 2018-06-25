import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPopoupComponent } from './report-popoup.component';

describe('ReportPopoupComponent', () => {
  let component: ReportPopoupComponent;
  let fixture: ComponentFixture<ReportPopoupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPopoupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPopoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
