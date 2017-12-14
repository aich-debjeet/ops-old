import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})

export class ChannelListComponent {
  @Input() userChannels: any;
  @Input() settingDisable: boolean;
  @Output() onChangeContext: EventEmitter<any> = new EventEmitter();
  @Output() onSelection: EventEmitter<any> = new EventEmitter();
  @Output() onPostMedia: EventEmitter<any> = new EventEmitter();

  baseUrl = environment.API_IMAGE;
  chosenChannel: any;
  constructor() {
    //
  }

  /**
   * Change changeFrame
   */
  changeFrame(frame_id: number) {
    this.onChangeContext.emit(frame_id);
  }
  /**
   * Get thumb image
   */
  getThumb(src: string, showThumb: boolean = false) {
    // console.log('SRC', src);
    const basePath = this.baseUrl;
    const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const m3 = (src).match(patt1);

    if (showThumb === true) {
      return basePath + src.replace(m3[0], '_thumb_250.jpeg');
    } else {
      return basePath + src;
    }
  }

  /**
   * Choose a channela
   * @param channel
   */

  chooseChannel(channel: any) {

    this.chosenChannel = channel;
    this.onSelection.emit(channel);
    this.onPostMedia.emit({});
  }

  /**
   * Create Channel
   */
  createChannel() {
    console.log('clicked');
    this.onChangeContext.emit(3);
  }

}

