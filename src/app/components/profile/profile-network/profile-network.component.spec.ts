import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNetworkComponent } from './profile-network.component';

describe('ProfileNetworkComponent', () => {
  let component: ProfileNetworkComponent;
  let fixture: ComponentFixture<ProfileNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
