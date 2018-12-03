import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit {
  @Input() mediaData;
  @Input() type: string;
  @Input() userThumb = false;
  @Input() loader = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter();
  dotMenuState: boolean;
  mediaType: any;
  userImage: string;
  imageLink: string = environment.API_IMAGE;
  domainLink: string = environment.API_DOMAIN;
  isSpotted: boolean;
  spotsCount: number;

  constructor(
    private router: Router,
    private store: Store<Media>,
  ) {
    this.dotMenuState = false;
  }

  ngOnInit() {
    if (this.mediaData) {
      if (!this.mediaData.ownerImage) {
        this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
      } else {
        this.userImage = this.imageLink + this.mediaData.ownerImage;
      }
      this.mediaType = this.mediaData.mtype;
      this.isSpotted = this.mediaData.isSpotted;
      this.spotsCount = this.mediaData.counts.spotsCount;
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

  dotMenuOpen() {
    this.dotMenuState = !this.dotMenuState;
  }

  onContentDelete(content) {
    this.postDelete.next(content);
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMediaAction(media: any) {
    const data = {
      'mediaType': media['mtype'],
      'id': media['id']
    }
    if (!this.isSpotted) {
      this.spotsCount++;
      this.isSpotted = true;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_SPOT, payload: data });
    } else {
      this.spotsCount--;
      this.isSpotted = false;
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_UNSPOT, payload: data });
    }
  }

}
