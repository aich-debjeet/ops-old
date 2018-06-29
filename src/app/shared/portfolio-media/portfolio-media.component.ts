import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-portfolio-media',
  templateUrl: './portfolio-media.component.html',
  styleUrls: ['./portfolio-media.component.scss']
})
export class PortfolioMediaComponent implements OnInit {

  @Input() portMediaDetails: any;
  @Input() portMediaCategory: any;
  @Input() isOwner: Boolean;
  @Output() displaySelectedMedia: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeSelectedMedia: EventEmitter<any> = new EventEmitter<any>();
  baseImageUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  viewPortMedia(data: any) {
    this.displaySelectedMedia.emit(data);
  }

  removePost(mediaId: string) {
    this.removeSelectedMedia.emit(mediaId);
  }

}
