import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLeftblockComponent } from './org-leftblock.component';

describe('OrgLeftblockComponent', () => {
  let component: OrgLeftblockComponent;
  let fixture: ComponentFixture<OrgLeftblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgLeftblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLeftblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
