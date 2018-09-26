import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEducationFormComponent } from './about-education-form.component';

describe('AboutEducationFormComponent', () => {
  let component: AboutEducationFormComponent;
  let fixture: ComponentFixture<AboutEducationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEducationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
