import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAwardsFormComponent } from './about-awards-form.component';

describe('AboutAwardsFormComponent', () => {
  let component: AboutAwardsFormComponent;
  let fixture: ComponentFixture<AboutAwardsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAwardsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAwardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
