import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLandingComponent } from './events-landing.component';

describe('EventsLandingComponent', () => {
  let component: EventsLandingComponent;
  let fixture: ComponentFixture<EventsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
