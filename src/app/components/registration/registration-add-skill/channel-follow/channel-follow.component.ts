import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-channel-follow',
  templateUrl: './channel-follow.component.html',
  styleUrls: ['./channel-follow.component.scss']
})
export class ChannelFollowComponent implements OnInit {
  @Input() ChannelFollow;
  constructor() { }

  ngOnInit() {
  }

}
