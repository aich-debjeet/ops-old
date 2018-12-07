import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent {
  @Input() src: any;
  @Input() showControls = false;
  preload = 'auto';
  isPortrait = false; // assuming video is landscape by default
}
