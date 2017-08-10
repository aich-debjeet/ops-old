import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordMailComponent } from './password-mail.component';

describe('PasswordMailComponent', () => {
  let component: PasswordMailComponent;
  let fixture: ComponentFixture<PasswordMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
