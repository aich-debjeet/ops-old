import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-videplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit, AfterViewInit {
  @Input() src: any;
  @Input() play: boolean = false;
  source: any;
  isPortrait = false; // assuming video is landscape by default
  constructor() {
    this.source = this.src;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const videoElem: HTMLVideoElement = <HTMLVideoElement>document.getElementById('singleVideo');
    console.log('videoElem', videoElem);
    const self = this;
    videoElem.addEventListener('loadeddata', function() {
      console.log('videoElem loaded');
      const vidH = videoElem.videoHeight;
      const vidW = videoElem.videoWidth;
      console.log(vidH, vidW);

      // check if video is portrait
      if (vidH > vidW) {
        self.isPortrait = true;
        console.log('video portrait');
      } else {
        console.log('video lanscape');
      }
    });
  }

}
