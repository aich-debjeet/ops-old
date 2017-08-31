import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.scss'],
  providers: [DatePipe]
})
export class MediaPopupComponent implements OnInit {
  private imageLink: string = environment.API_IMAGE;
  @Input() data;
  @Output() onComment: EventEmitter<any> = new EventEmitter<any>();
  message: string;

  constructor() { }

  ngOnInit() {
    console.log('popup media');
    console.log(this.data)
  }
  keyDownFunction() {
    if (this.message !== null || this.message !== ' ') {
      this.onComment.emit(this.message);
      this.message = null;
    }
  }

}
