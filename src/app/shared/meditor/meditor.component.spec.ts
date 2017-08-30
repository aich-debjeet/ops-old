import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditorComponent } from './meditor.component';

describe('MeditorComponent', () => {
  let component: MeditorComponent;
  let fixture: ComponentFixture<MeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
