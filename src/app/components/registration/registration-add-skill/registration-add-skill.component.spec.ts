import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAddSkillComponent } from './registration-add-skill.component';

describe('RegistrationAddSkillComponent', () => {
  let component: RegistrationAddSkillComponent;
  let fixture: ComponentFixture<RegistrationAddSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAddSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
