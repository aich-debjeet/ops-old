import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';

import FilesHelper from '../../helpers/fileUtils';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})

export class ChannelComponent implements OnInit {
  @Input() className: string;
  @Input() channelData;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();

  // Its for admin spefic edit option
  @Input() type: boolean;
  userImage: string;
  isfollowing: boolean;
  private image_base_url: string = environment.API_IMAGE;
  constructor() {
    this.isfollowing = this.channelData.isfollowing;
  }

  ngOnInit() {
    const defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    if ((this.channelData.ownerImage !== defaultImage) || (this.channelData.ownerImage !== '')) {
      this.userImage = defaultImage;
    } else {
      this.userImage = this.image_base_url + this.channelData.ownerImage;
    }
  }

  toggleFollowBtn(i) {
    const followState = this.isfollowing;
    this.onClick.emit(i);
    this.onFollow.emit(!followState);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

}
