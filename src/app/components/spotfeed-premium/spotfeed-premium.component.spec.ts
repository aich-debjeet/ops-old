import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotfeedPremiumComponent } from './spotfeed-premium.component';

describe('SpotfeedPremiumComponent', () => {
  let component: SpotfeedPremiumComponent;
  let fixture: ComponentFixture<SpotfeedPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotfeedPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotfeedPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
