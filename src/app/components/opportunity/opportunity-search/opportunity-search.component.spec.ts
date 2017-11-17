import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySearchComponent } from './opportunity-search.component';

describe('OpportunitySearchComponent', () => {
  let component: OpportunitySearchComponent;
  let fixture: ComponentFixture<OpportunitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
