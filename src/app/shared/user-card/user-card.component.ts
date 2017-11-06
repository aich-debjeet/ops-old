import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { ProfileModal } from './../../models/profile.model';

// actions
import { ProfileActions } from './../../actions/profile.action';

import FilesHelper from '../../helpers/fileUtils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  @Input() artist;
  @Input() artistIndex;
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  isFollowing: boolean;
  userImage: string;
  baseUrl: string = environment.API_IMAGE;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store<ProfileModal>
  ) {
    this.isFollowing = false;
  }

  ngOnInit() {
    if (!this.artist.ownerImage) {
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.baseUrl + this.artist.ownerImage;
    }
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
  }

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  /**
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.isFollowing = false;
  }

  disableFollowForSelf() {
    return false;
  }
}
