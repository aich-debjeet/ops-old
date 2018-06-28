import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import FilesHelper from '../../helpers/fileUtils';

@Component({
  selector: 'app-portfolio-view-media',
  templateUrl: './portfolio-view-media.component.html',
  styleUrls: ['./portfolio-view-media.component.scss']
})
export class PortfolioViewMediaComponent implements OnInit {

  @Input() viewMediaDetails: any;
  @Output() closeViewMediaModal: EventEmitter<any> = new EventEmitter<any>();
  baseImageUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  closeViewMedia() {
    this.closeViewMediaModal.emit();
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

}
