import { Component, OnInit, Input, AfterViewInit, Renderer } from '@angular/core';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit, AfterViewInit {
  @Input() src: any;
  @Input() play: boolean = false;
  preload: string = 'auto';
  source: any;
  isPortrait = false; // assuming video is landscape by default
  constructor(
    // private renderer: Renderer
  ) {
    this.source = this.src;
    // console.log('trigger again constructor');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // const self = this;
    // console.log('trigger again view init');

    // const videoElem: HTMLVideoElement = <HTMLVideoElement>document.getElementById('singleVideo');
    // this.renderer.listen(videoElem, 'loadeddata', (event) => {
    //   // console.log('video event', event);
    //   // console.log('videoElem loaded');
    //     const vidH = videoElem.videoHeight;
    //     const vidW = videoElem.videoWidth;
    //     console.log(vidH, vidW);
    //     // check if video is portrait
    //     if (vidH > vidW) {
    //       self.isPortrait = true;
    //       // console.log('video portrait');
    //     } else {
    //       // console.log('video lanscape');
    //     }
    // });

    const videoElem: HTMLVideoElement = <HTMLVideoElement>document.getElementById('singleVideo');
    // console.log('videoElem', videoElem);
    const self = this;
    videoElem.addEventListener('loadeddata', function() {
      // console.log('videoElem loaded');
      const vidH = videoElem.videoHeight;
      const vidW = videoElem.videoWidth;
      // console.log(vidH, vidW);

      // check if video is portrait
      if (vidH > vidW) {
        self.isPortrait = true;
        // console.log('video portrait');
      } else {
        // console.log('video lanscape');
      }
    });
  }

}
