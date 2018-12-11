import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.audioPlayed.emit(this.mediaId);
    }, 1000);
  }

}
