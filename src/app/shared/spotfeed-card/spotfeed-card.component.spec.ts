import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotfeedCardComponent } from './spotfeed-card.component';

describe('SpotfeedCardComponent', () => {
  let component: SpotfeedCardComponent;
  let fixture: ComponentFixture<SpotfeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotfeedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotfeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
