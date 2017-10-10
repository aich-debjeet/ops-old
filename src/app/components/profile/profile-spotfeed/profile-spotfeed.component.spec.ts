import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSpotfeedComponent } from './profile-spotfeed.component';

describe('ProfileSpotfeedComponent', () => {
  let component: ProfileSpotfeedComponent;
  let fixture: ComponentFixture<ProfileSpotfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSpotfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSpotfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
