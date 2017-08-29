import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideplayerComponent } from './videplayer.component';

describe('VideplayerComponent', () => {
  let component: VideplayerComponent;
  let fixture: ComponentFixture<VideplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
