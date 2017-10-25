import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumEditorComponent } from './meditor.component';

describe('MeditorComponent', () => {
  let component: MediumEditorComponent;
  let fixture: ComponentFixture<MediumEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
