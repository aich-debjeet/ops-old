import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWorkFormComponent } from './about-work-form.component';

describe('AboutWorkFormComponent', () => {
  let component: AboutWorkFormComponent;
  let fixture: ComponentFixture<AboutWorkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutWorkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWorkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
