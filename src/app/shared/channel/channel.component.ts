import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() className: string;
  @Input() channelData;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  //Its for admin spefic edit option
  @Input() type: boolean;
  private image_base_url: string = environment.API_IMAGE; 
  constructor() { }

  ngOnInit() {
    
  }

  handleClick(event: any) {
    this.onClick.emit(event);
  }

}
