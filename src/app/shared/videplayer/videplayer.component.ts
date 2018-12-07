import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GeneralUtilities } from 'app/helpers/general.utils';
import { VgAPI } from 'videogular2/core';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() src: any;
  @Input() showControls = false;
  preload = 'auto';
  source: any;
  isPortrait = false; // assuming video is landscape by default
  gUtilsSub: Subscription;
  videoPlayer: IPlayable;

  constructor(private gUtils: GeneralUtilities) {
    this.source = this.src;
  }

  ngOnInit() {
    this.gUtilsSub = this.gUtils.listen().subscribe((e: any) => {
      if (e.component && e.component === 'VideplayerComponent') {
        if (this.videoPlayer && e.action === 'playVideo') {
          this.videoPlayer.play();
        }
      }
    })
  }

  ngOnDestroy() {
    this.gUtilsSub.unsubscribe();
  }

  onPlayerReady(api: VgAPI) {
    this.videoPlayer = api.getDefaultMedia();
  }

  ngAfterViewInit() {
    // const videoElem: HTMLVideoElement = <HTMLVideoElement>document.getElementById('videoElem');
    // // console.log('videoElem', videoElem);
    // const self = this;
    // videoElem.addEventListener('loadeddata', function() {
    //   const vidH = videoElem.videoHeight;
    //   const vidW = videoElem.videoWidth;
    //   // check if video is portrait
    //   if (vidH > vidW) {
    //     self.isPortrait = true;
    //     console.log('video portrait');
    //   } else {
    //     console.log('video lanscape');
    //   }
    // });
  }

}
