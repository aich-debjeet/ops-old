import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { ProfileModal } from './../../models/profile.model';

// actions
import { ProfileActions } from './../../actions/profile.action';

import FilesHelper from '../../helpers/fileUtils';
import { ToastrService } from 'ngx-toastr';

import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-user-card-new',
  templateUrl: './user-card-new.component.html',
  styleUrls: ['./user-card-new.component.scss']
})
export class UserCardNewComponent implements OnInit {

  @Input() artist;
  @Input() artistIndex;
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  isFollowing: boolean;
  userImage: string;
  baseUrl: string = environment.API_IMAGE;
  userState$: any;
  userProfile: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store<ProfileModal>
  ) {
    this.isFollowing = false;

    /* ================== current user ========= */
    this.userState$ = this.store.select('profileTags');
    this.userState$.subscribe((state) => {
      this.userProfile = state;
    });
    // this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    /* ================== current user ========= */
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
    user.extra.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

  disableFollowForSelf(username: string) {
    if (this.userProfile && (this.userProfile['profile_navigation_details']['username']) === username) {
      return true;
    }
    return false;
  }

}
