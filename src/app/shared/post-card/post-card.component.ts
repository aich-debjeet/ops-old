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

  private imageLink: string = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }
}
