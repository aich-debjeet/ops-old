import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import FilesHelper from '../../helpers/fileUtils';

@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.scss'],
  providers: [DatePipe]
})

export class MediaPopupComponent implements OnInit {
  imageLink: string = environment.API_IMAGE;
  @Input() data;
  @Input() comment;
  @Input() profileImage;
  @Output() onComment: EventEmitter<any> = new EventEmitter<any>();
  message: string;
  private isDisplay = true;

  constructor() { }

  ngOnInit() {
    console.log('popup media');
    console.log(this.profileImage)
  }

  keyDownFunction() {
    if (this.message !== null || this.message !== ' ') {
      this.onComment.emit(this.message);
      this.message = null;
    }
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  beginEdit(el: HTMLElement): void {
        this.isDisplay = false;

        setTimeout(() => {
            el.focus();
        }, 100);
    }

    editDone(newText: string): void {
        this.isDisplay = true;
        // this.text = newText;
        // this.edit.emit(this.text);
    }

}
