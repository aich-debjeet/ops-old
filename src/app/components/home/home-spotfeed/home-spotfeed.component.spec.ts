import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpotfeedComponent } from './home-spotfeed.component';

describe('HomeSpotfeedComponent', () => {
  let component: HomeSpotfeedComponent;
  let fixture: ComponentFixture<HomeSpotfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSpotfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSpotfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
