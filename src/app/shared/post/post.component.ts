import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import FilesHelper from '../../helpers/fileUtils';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [ DatePipe ],
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() mediaData;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  dotMenuState: boolean;
  comment: any;
  userData: any;
  following: boolean;
  followingCount: any;
  commentCount: any;
  mediaId: any;
  mediaStore = initialMedia;
  mediaState$: Observable<Media>;

  userImage: string;

  private imageLink: string = environment.API_IMAGE;

  constructor(
    private router: Router,
    private store: Store<Media>
  ) {
    console.log(this.mediaData);
    this.dotMenuState = false;
    this.mediaState$ = store.select('mediaStore');

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      // console.log(state);
      // this.userData = this.mediaStore.media_detail;
    });

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
    this.mediaId = this.mediaData.id;
    this.commentCount = this.mediaData.commentsCount;
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
    console.log('Opening');
    this.dotMenuState = !this.dotMenuState;
    console.log(this.dotMenuState);
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

  /**
   * Submit Comment
   */
  sbComment() {
    this.commentCount++
    console.log('Comment Submit');
  }

}
