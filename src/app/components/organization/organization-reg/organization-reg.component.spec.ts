import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRegComponent } from './organization-reg.component';

describe('OrganizationRegComponent', () => {
  let component: OrganizationRegComponent;
  let fixture: ComponentFixture<OrganizationRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
