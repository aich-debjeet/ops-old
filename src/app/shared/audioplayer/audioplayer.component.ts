import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})

export class AudioPlayerComponent implements OnInit {
  @Input() src: string;
  constructor() {
    console.log(this.src);
  }

  ngOnInit() {
    // console.log(this.src);
  }

}
