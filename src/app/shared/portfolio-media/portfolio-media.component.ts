import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-portfolio-media',
  templateUrl: './portfolio-media.component.html',
  styleUrls: ['./portfolio-media.component.scss']
})
export class PortfolioMediaComponent implements OnInit {

  @Input() portMediaDetails: any;
  @Output() displaySelectedMedia: EventEmitter<any> = new EventEmitter<any>();
  baseImageUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  viewPortMedia(data) {
    this.displaySelectedMedia.emit(data);
  }

}
