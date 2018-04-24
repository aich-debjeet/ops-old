import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesInnerComponent } from './communities-inner.component';

describe('CommunitiesInnerComponent', () => {
  let component: CommunitiesInnerComponent;
  let fixture: ComponentFixture<CommunitiesInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
