import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';

import { TruncatePipe } from '../../pipes/truncate.pipe';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import FilesHelper from '../../helpers/fileUtils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit {
  @Input() mediaData;
  @Input() type: string;
  // @Input() userThumb: string;
  @Input() userThumb: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter();
  dotMenuState: boolean;
  following: boolean;
  followingCount: any;
  mediaType: any;

  userImage: string;

  imageLink: string = environment.API_IMAGE;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store<Media>,
  ) {
    this.dotMenuState = false;
  }

  ngOnInit() {
    // if (!this.mediaData.ownerImage) {
    //   this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    // } else {
    //   this.userImage = this.imageLink + this.mediaData.ownerImage;
    // }
    // this.following = this.mediaData.isSpotted;
    // this.followingCount = this.mediaData.spotsCount;
    // this.mediaType = this.mediaData.mtype;
    // this.useThumb = false;
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

  dotMenuOpen() {
    this.dotMenuState = !this.dotMenuState;
  }

  onContentDelete(content) {
    this.postDelete.next(content);
  }

  /**
   * Get thumb image
   */
  getThumb(src: string, showThumb: boolean = false) {
    const basePath = this.imageLink;
    const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const m3 = (src).match(patt1);
    if (showThumb === true) {
      return basePath + src.replace(m3[0], '_thumb_250.jpeg');
    } else {
      return basePath + src;
    }
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(mediaId: string) {
    const data = {
      'mediaType': this.mediaType,
      'id': mediaId
    }
    if (this.following === false) {
      this.following = true;
      this.followingCount++;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
    }else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.following = false
      this.followingCount--;
    }
  }

}
