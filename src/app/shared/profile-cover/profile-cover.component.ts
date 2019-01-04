import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-cover',
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.scss']
})
export class ProfileCoverComponent implements OnInit {

  @Input() coverImage: string;
  @Input() showPreloader = false;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  imageChangedEvent = '';
  croppedImage = '';
  hidePreview = false;
  disableSave = true;

  constructor() { }

  ngOnInit() {
    if (this.coverImage) {
      this.croppedImage = this.coverImage;
    }
  }

  // event to check for file selection
  fileChangeEvent(event: any): void {
    this.disableSave = false;
    this.imageChangedEvent = event;
  }

  // event for image crop
  imageCropped(image: string) {
    this.croppedImage = image;
    this.hidePreview = true;
  }

  // image loaded
  imageLoaded() { }

  // cancel image update
  cancelUpdate() {
    this.cancel.emit();
  }

  // save updated image
  saveImage() {
    this.disableSave = true;
    this.showPreloader = true;
    this.save.emit(this.croppedImage);
  }

}
