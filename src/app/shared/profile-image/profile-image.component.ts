import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  baseUrl = environment.API_IMAGE;

  @Input() profileImage: string;
  @Input() showPreloader = false;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  imageChangedEvent = '';
  croppedImage = '';
  hidePreview = false;
  disableSave = true;

  constructor() { }

  ngOnInit() {
    if (this.profileImage) {
      this.croppedImage = this.profileImage;
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
