import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAboutComponent } from './org-about.component';

describe('OrgAboutComponent', () => {
  let component: OrgAboutComponent;
  let fixture: ComponentFixture<OrgAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
