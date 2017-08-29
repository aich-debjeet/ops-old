import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgvPlayerComponent } from './ngv-player.component';

describe('NgvPlayerComponent', () => {
  let component: NgvPlayerComponent;
  let fixture: ComponentFixture<NgvPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgvPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgvPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
