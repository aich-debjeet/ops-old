import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})

export class AudioPlayerComponent {
  @Input() src: string;
  @Input() type: string;
  @Input() size: string;

  constructor() {}

}
