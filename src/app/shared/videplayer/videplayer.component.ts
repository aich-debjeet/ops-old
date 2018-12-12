import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit {
  @Input() src: any;
  @Input() mediaId = '';
  @Input() showControls = false;
  @Output() videoPlayed: EventEmitter<any> = new EventEmitter<any>();
  preload = 'auto';
  isPortrait = false; // assuming video is landscape by default

  ngOnInit() {
    setTimeout(() => {
      this.videoPlayed.emit(this.mediaId);
    }, 1000);
  }
}
