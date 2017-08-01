import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestEventsComponent } from './nearest-events.component';

describe('NearestEventsComponent', () => {
  let component: NearestEventsComponent;
  let fixture: ComponentFixture<NearestEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearestEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
