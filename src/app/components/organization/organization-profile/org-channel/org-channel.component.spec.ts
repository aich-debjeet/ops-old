import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChannelComponent } from './org-channel.component';

describe('OrgChannelComponent', () => {
  let component: OrgChannelComponent;
  let fixture: ComponentFixture<OrgChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
