import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelInnerComponent } from './channel-inner.component';

describe('ChannelInnerComponent', () => {
  let component: ChannelInnerComponent;
  let fixture: ComponentFixture<ChannelInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
