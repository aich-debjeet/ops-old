import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCoverComponent } from './org-cover.component';

describe('OrgCoverComponent', () => {
  let component: OrgCoverComponent;
  let fixture: ComponentFixture<OrgCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
