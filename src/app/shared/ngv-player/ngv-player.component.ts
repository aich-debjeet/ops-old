import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import videojs from 'video.js';

// Models
import MediaPlayer from 'app/models/mediaplayer.model';

@Component({
  selector: 'app-ngv-player',
  templateUrl: './ngv-player.component.html',
  styleUrls: ['./ngv-player.component.css']
})

export class NgvPlayerComponent implements OnInit, AfterViewInit {
  @Input() config: MediaPlayer;
  @Input() idx: string;
  @Input() url: any;
  private player: any;
  @Input() sources: any;
  // constructor initializes our declared vars
  constructor(elementRef: ElementRef) {
    this.url = false;
    this.player = false;
    this.idx = '3x';
  }

  ngOnInit() {}
  ngAfterViewInit() {
    // ID with which to access the template's video element
    const el = 'video_' + this.idx;
    // const el = 'video_x2_html5_api';
    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), {}, function() {
      // Store the video object
      const myPlayer = this, id = myPlayer.id();
      // Make up an aspect ratio
      const aspectRatio = 264 / 640;
      // internal method to handle a window resize event to adjust the video player
      function resizeVideoJS() {
        const width = document.getElementById(id).parentElement.offsetWidth;
        myPlayer.width(width);
        myPlayer.height( width * aspectRatio );
      }

      // Initialize resizeVideoJS()
      resizeVideoJS();

      // Then on resize call resizeVideoJS()
      window.onresize = resizeVideoJS;
    });
  }
}
