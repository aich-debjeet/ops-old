import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowComponent } from './dow.component';

describe('DowComponent', () => {
  let component: DowComponent;
  let fixture: ComponentFixture<DowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
