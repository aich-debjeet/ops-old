import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySearchCreatedComponent } from './opportunity-search-created.component';

describe('OpportunitySearchCreatedComponent', () => {
  let component: OpportunitySearchCreatedComponent;
  let fixture: ComponentFixture<OpportunitySearchCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySearchCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySearchCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
