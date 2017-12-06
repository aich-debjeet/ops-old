import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCarditemComponent } from './events-carditem.component';

describe('EventsCarditemComponent', () => {
  let component: EventsCarditemComponent;
  let fixture: ComponentFixture<EventsCarditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsCarditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCarditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
