import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPopupComponent } from './media-popup.component';

describe('MediaPopupComponent', () => {
  let component: MediaPopupComponent;
  let fixture: ComponentFixture<MediaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
