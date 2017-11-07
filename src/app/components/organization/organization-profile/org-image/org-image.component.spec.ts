import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgImageComponent } from './org-image.component';

describe('OrgImageComponent', () => {
  let component: OrgImageComponent;
  let fixture: ComponentFixture<OrgImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
