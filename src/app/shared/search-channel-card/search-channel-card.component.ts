import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import FilesHelper from '../../helpers/fileUtils';


// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-channel-card',
  templateUrl: './search-channel-card.component.html',
  styleUrls: ['./search-channel-card.component.scss']
})
export class SearchChannelCardComponent implements OnInit {

  @Input() className: string;
  @Input() channelData;
  @Input() currentUser: boolean;
  // @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  baseUrl: string = environment.API_IMAGE;

  // Its for admin spefic edit option
  @Input() type: boolean;
  userImage: string;
  isfollowing: boolean;
  ispin: boolean;
  showEdit: boolean;
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  userHandle: any;
  image_base_url: string = environment.API_IMAGE;

  constructor(
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');

     this.storeState$.subscribe((state) => {
       this.userHandle = state['profile_details'].handle;
      // this.userProfile = state['profile_details'];
    });
  }

  ngOnInit() {
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

  pinChannel(spotfeedId) {
    if (this.ispin === false) {
      this.ispin = true;
      const data = {
        'spotfeedId': spotfeedId,
        'profileHandle': this.userHandle
      }
      this._store.dispatch({ type: ProfileActions.PIN_CHANNEL, payload: data });
    }else {
      this.ispin = false;
      const data = {
        'spotfeedId': spotfeedId,
        'profileHandle': this.userHandle
      }
      this._store.dispatch({ type: ProfileActions.UNPIN_CHANNEL, payload: data });
    }
  }

  /**
   * Delete a Channel
   */
  deleteChannel(channelId: string) {
    this.onDelete.emit(channelId);
  }

}
