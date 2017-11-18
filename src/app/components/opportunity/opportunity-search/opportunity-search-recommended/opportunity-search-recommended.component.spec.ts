import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySearchRecommendedComponent } from './opportunity-search-recommended.component';

describe('OpportunitySearchRecommendedComponent', () => {
  let component: OpportunitySearchRecommendedComponent;
  let fixture: ComponentFixture<OpportunitySearchRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySearchRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySearchRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
