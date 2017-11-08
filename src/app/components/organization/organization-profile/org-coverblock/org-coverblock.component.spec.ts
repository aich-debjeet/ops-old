import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCoverblockComponent } from './org-coverblock.component';

describe('OrgCoverblockComponent', () => {
  let component: OrgCoverblockComponent;
  let fixture: ComponentFixture<OrgCoverblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCoverblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCoverblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
