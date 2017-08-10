import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFollowComponent } from './channel-follow.component';

describe('ChannelFollowComponent', () => {
  let component: ChannelFollowComponent;
  let fixture: ComponentFixture<ChannelFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
