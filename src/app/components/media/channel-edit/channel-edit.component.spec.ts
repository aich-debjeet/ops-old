import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelComponent } from './channel-edit.component';

describe('EditChannelComponent', () => {
  let component: EditChannelComponent;
  let fixture: ComponentFixture<EditChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
