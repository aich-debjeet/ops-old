import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})

export class ChannelComponent implements OnInit, OnDestroy {
  @Input() className: string;
  @Input() channelData;
  @Input() currentUser: boolean;
  @Input() loader = false;
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  imageBaseLink: string = environment.API_IMAGE;
  @Input() type: boolean;
  userImage: string;
  isfollowing = false;
  ispin: boolean;
  showEdit: boolean;
  userHandle: any;
  image_base_url: string = environment.API_IMAGE;
  ownerHandle = '';

  constructor() { }

  ngOnInit() {
    this.ownerHandle = localStorage.getItem('loggedInProfileHandle');
    if (this.channelData) {
      this.isfollowing = this.channelData.isFollowing || false;
      this.showEdit = false;
      this.ispin = this.channelData.isPinned || false;
      const defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
      if ((this.channelData.ownerImage !== defaultImage) || (this.channelData.ownerImage !== '')) {
        this.userImage = defaultImage;
      } else {
        this.userImage = this.image_base_url + this.channelData.ownerImage;
      }
    }
  }

  ngOnDestroy() { }

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
  }

}
