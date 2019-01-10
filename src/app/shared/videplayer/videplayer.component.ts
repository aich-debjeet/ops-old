import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
// import { GeneralUtilities } from 'app/helpers/general.utils';
// import { Subscription } from 'rxjs/Subscription';
// import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import { VgAPI } from 'videogular2/core';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() src: any;
  @Input() mediaId = '';
  @Input() showControls = false;
  @Output() videoPlayed: EventEmitter<any> = new EventEmitter<any>();
  preload = 'auto';
  isPortrait = false; // assuming video is landscape by default
  // gUtilsSub: Subscription;
  // videoPlayer: IPlayable;
  api: VgAPI;

  constructor(
    // private gUtils: GeneralUtilities
  ) { }

  ngOnInit() {
    // this.gUtilsSub = this.gUtils.listen().subscribe((e: any) => {
    //   if (e.component && e.component === 'VideplayerComponent') {
    //     if (this.videoPlayer && e.action === 'playVideo') {
    //       this.videoPlayer.play();
    //       this.videoPlayed.emit(this.mediaId);
    //     }
    //   }
    // });
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

  ngOnDestroy() {
    // this.gUtilsSub.unsubscribe();
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.play();
    // this.videoPlayer = api.getDefaultMedia();
    this.videoPlayed.emit(this.mediaId);
  }
}
