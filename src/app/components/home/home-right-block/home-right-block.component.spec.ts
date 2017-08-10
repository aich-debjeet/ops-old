import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRightBlockComponent } from './home-right-block.component';

describe('HomeRightBlockComponent', () => {
  let component: HomeRightBlockComponent;
  let fixture: ComponentFixture<HomeRightBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRightBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRightBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
