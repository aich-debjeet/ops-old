import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

import FilesHelper from '../../helpers/fileUtils';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit {
  @Input() mediaData;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  dotMenuState: boolean;

  private imageLink: string = environment.API_IMAGE;

  constructor() {
    this.dotMenuState = false;
  }

  ngOnInit() {
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
    console.log('Deleting this Channenl');
  }

  handleClick(event: any) {
    this.onClick.emit(event);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  dotMenuOpen() {
    console.log('Opening');
    this.dotMenuState = !this.dotMenuState;
    console.log(this.dotMenuState);
  }
}
