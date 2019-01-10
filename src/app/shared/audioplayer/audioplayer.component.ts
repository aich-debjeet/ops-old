import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})

export class AudioPlayerComponent implements OnInit {
  @Input() src: string;
  @Input() type: string;
  @Input() size: string;
  @Input() mediaId: string;
  @Output() audioPlayed: EventEmitter<any> = new EventEmitter<any>();
  api: VgAPI;

  constructor() {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.audioPlayed.emit(this.mediaId);
    // }, 1000);
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    if (this.api.play && typeof this.api.play === 'function') {
      this.api.play();
      this.audioPlayed.emit(this.mediaId);
    }
  }

}
