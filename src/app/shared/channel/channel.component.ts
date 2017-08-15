import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() className: string;
  @Input() channelData;
  constructor() { }

  ngOnInit() {
    
  }

}
