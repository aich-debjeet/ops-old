import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySearchAppliedComponent } from './opportunity-search-applied.component';

describe('OpportunitySearchAppliedComponent', () => {
  let component: OpportunitySearchAppliedComponent;
  let fixture: ComponentFixture<OpportunitySearchAppliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySearchAppliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySearchAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
