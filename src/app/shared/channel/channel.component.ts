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
  @Input() currentUser: boolean;
  // @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

  // Its for admin spefic edit option
  @Input() type: boolean;
  userImage: string;
  isfollowing: boolean;
  showEdit: boolean;
  private image_base_url: string = environment.API_IMAGE;
  constructor() {
  }

  ngOnInit() {
    this.isfollowing = this.channelData.isFollowing || false;
    this.showEdit = false;
    const defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    if ((this.channelData.ownerImage !== defaultImage) || (this.channelData.ownerImage !== '')) {
      this.userImage = defaultImage;
    } else {
      this.userImage = this.image_base_url + this.channelData.ownerImage;
    }
  }

  /**
   * Follow Channel Action
   * @param event
   */

  toggleFollowBtn(event) {
    const followState = this.isfollowing;
    this.isfollowing = !followState;

    const req = { channel: this.channelData, state: !followState }
    this.onFollow.emit(req);
  }

  /**
   * Check File type for component switching
   * @param fileName
   * @param fileType
   */
  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  /**
   * Toggle Options
   */
  showOptions() {
    this.showEdit = !this.showEdit;
  }

  /**
   * Delete a Channel
   */
  deleteChannel(channelId: string) {
    this.onDelete.emit(channelId);
    // console.log('Deleting ' + channelId);
  }

}
