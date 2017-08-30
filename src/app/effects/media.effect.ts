import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { MediaService } from '../services/media.service';
import { MediaActions } from '../actions/media.action';

@Injectable()
export class MediaEffect {

  /**
   * Media Upload
   */
  @Effect()
  uploadMedia$ = this.actions$
    .ofType(MediaActions.MEDIA_UPLOAD)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.postMedia(payload)
      .map(res => ({ type: MediaActions.MEDIA_UPLOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MediaActions.MEDIA_UPLOAD_FAILED, payload: res }))
    );

  /**
   * Post Status
   */
  @Effect()
  postStatusType$ = this.actions$
    .ofType(MediaActions.STATUS_SAVE)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.postStatus(payload)
      .map(res => ({ type: MediaActions.STATUS_SAVE_SUCCESS, payload: res }))
    );

  /**
   * Get Channel single page details
   */
  @Effect()
  getChannelDetail$ = this.actions$
    .ofType(MediaActions.GET_CHANNEL_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getSingleChannel(payload)
      .map(res => ({ type: MediaActions.GET_CHANNEL_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.GET_CHANNEL_DETAILS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get Media detail Page
   */
  @Effect()
  getMediaDetail$ = this.actions$
    .ofType(MediaActions.MEDIA_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getMediaDeatails(payload)
      .map(res => ({ type: MediaActions.MEDIA_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.MEDIA_DETAILS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Post comment
   */
  @Effect()
  postComment$ = this.actions$
    .ofType(MediaActions.POST_COMMENT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.postComment(payload)
      .map(res => ({ type: MediaActions.POST_COMMENT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.POST_COMMENT_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Post Comment Sucsess
   */
  // @Effect()
  // postCommentSuccess$ = this.actions$
  //   .ofType(MediaActions.POST_COMMENT_SUCCESS)
  //   .map(res => ({ type: MediaActions.MEDIA_DETAILS }))

  constructor(
      private actions$: Actions,
      private mediaService: MediaService
    ) {}
}
