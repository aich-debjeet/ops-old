import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBottonComponent } from './share-botton.component';

describe('ShareBottonComponent', () => {
  let component: ShareBottonComponent;
  let fixture: ComponentFixture<ShareBottonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareBottonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
