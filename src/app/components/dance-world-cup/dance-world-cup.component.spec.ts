import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceWorldCupComponent } from './dance-world-cup.component';

describe('DanceWorldCupComponent', () => {
  let component: DanceWorldCupComponent;
  let fixture: ComponentFixture<DanceWorldCupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanceWorldCupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceWorldCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
