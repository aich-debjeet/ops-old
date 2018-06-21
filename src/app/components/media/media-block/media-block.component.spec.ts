import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBlockComponent } from './media-block.component';

describe('MediaBlockComponent', () => {
  let component: MediaBlockComponent;
  let fixture: ComponentFixture<MediaBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
