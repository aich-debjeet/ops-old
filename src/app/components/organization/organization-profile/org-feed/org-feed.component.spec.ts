import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFeedComponent } from './org-feed.component';

describe('OrgFeedComponent', () => {
  let component: OrgFeedComponent;
  let fixture: ComponentFixture<OrgFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
