import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import FilesHelper from '../../helpers/fileUtils';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit {
  @Input() mediaData;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  dotMenuState: boolean;
  following: boolean;
  followingCount: any;

  userImage: string;

  private imageLink: string = environment.API_IMAGE;

  constructor(
    private router: Router,
    private store: Store<Media>
  ) {
    this.dotMenuState = false;
  }

  ngOnInit() {
    if (!this.mediaData.ownerImage) {
      console.log('not there');
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.imageLink + this.mediaData.ownerImage;
    }
    this.following = this.mediaData.isSpotted;
    this.followingCount = this.mediaData.spotsCount;
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
    console.log('Deleting this Channenl');
  }

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  dotMenuOpen() {
    this.dotMenuState = !this.dotMenuState;
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(mediaId: string) {
    console.log(this.mediaData);
    if (this.following === false) {
      this.following = true;
      this.followingCount++;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: this.mediaData.id });
    }else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: this.mediaData.id });
      this.following = false
      this.followingCount--;
    }
  }

}
