import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { MediaService } from '../services/media.service';
import { MediaActions } from '../actions/media.action';
// import * as MediaActions from '../actions/media.action';

import { Media, initialMedia  } from '../models/media.model';

@Injectable()
export class MediaEffect {

  /**
   * Get current user media profile
   */
  @Effect()
  loadUserMedia$ = this.actions$
    .ofType(MediaActions.LOAD_USER_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getUserMedia(payload)
      .map(res => ({ type: MediaActions.LOAD_USER_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.LOAD_USER_MEDIA_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

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
      .catch((res) => Observable.of({
        type: MediaActions.STATUS_SAVE_FAILED,
        payload: { errorStatus: res.status }
      }))
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
   * Get Media detail Page
   */
  @Effect()
  getMediaNext$ = this.actions$
    .ofType(MediaActions.MEDIA_NEXT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getMediaNext(payload)
      .map(res => ({ type: MediaActions.MEDIA_NEXT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.MEDIA_NEXT_FAILED,
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
   * Update comment
   */
  @Effect()
  updateComment$ = this.actions$
    .ofType(MediaActions.UPDATE_COMMENT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.updateComment(payload)
      .map(res => ({ type: MediaActions.UPDATE_COMMENT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.UPDATE_COMMENT_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

   /**
   * Delete comment
   */
  @Effect()
  deleteComment$ = this.actions$
    .ofType(MediaActions.DELETE_COMMENT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.deleteComment(payload)
      .map(res => ({ type: MediaActions.DELETE_COMMENT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.DELETE_COMMENT_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Media Comment Fetch
   */
  @Effect()
  mediaCommentFetch$ = this.actions$
    .ofType(MediaActions.MEDIA_COMMENT_FETCH)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.fetchMediaComment(payload)
      .map(res => ({ type: MediaActions.MEDIA_COMMENT_FETCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.MEDIA_COMMENT_FETCH_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Spot a Media
   */
  @Effect()
    spotMedia$ = this.actions$
      .ofType(MediaActions.MEDIA_SPOT)
      .map(toPayload)
      .switchMap((payload) => this.mediaService.spotMedia(payload)
        .map(res => ({ type: MediaActions.MEDIA_SPOT_SUCCESS, payload: res }))
        .catch((res) => Observable.of({
          type: MediaActions.MEDIA_SPOT_FAILED,
          payload: { errorStatus: res.status }
        }))
      );

      /**
       *Get Media Report 
       */
      @Effect()
      getReport$ = this.actions$
      .ofType(MediaActions.MEDIA_POST_REPORT)
      .map(toPayload)
      .switchMap((payload) => this.mediaService.getReports(payload)
      .map(res => ({ type: MediaActions.MEDIA_POST_REPORT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MediaActions.MEDIA_POST_REPORT_FAILED, payload: res }))
    );

  /**
   *Media post delete
   */
  @Effect()
    mediaPostDelete$ = this.actions$
      .ofType(MediaActions.MEDIA_POST_DELETE)
      .map(toPayload)
      .switchMap((payload) => this.mediaService.mediaPostDelete(payload)
        .map(res => ({ type: MediaActions.MEDIA_POST_DELETE_SUCCESS, payload: res }))
        .catch((res) => Observable.of({
          type: MediaActions.MEDIA_POST_DELETE_FAILED,
          payload: { errorStatus: res.status }
        }))
      );

  /**
   * media edit
   */
  @Effect()
  mediaEdit$ = this.actions$
    .ofType(MediaActions.MEDIA_EDIT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.mediaEdit(payload)
      .map(res => ({ type: MediaActions.MEDIA_EDIT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.MEDIA_EDIT_FAILED,
        payload: { errorStatus: res.status }
      }))
    );


  /**
   * Un Spot a Media
   */
  @Effect()
  upSpotMedia$ = this.actions$
    .ofType(MediaActions.MEDIA_UNSPOT)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.unSpotMedia(payload)
      .map(res => ({ type: MediaActions.MEDIA_UNSPOT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.MEDIA_UNSPOT_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   *  Load my Media
   */
  @Effect()
  loadMyStatus$ = this.actions$
    .ofType(MediaActions.LOAD_MY_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getMyMedia(payload)
      .map(res => ({ type: MediaActions.LOAD_MY_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.LOAD_MY_MEDIA_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   *  Load current channel post
   */
  @Effect()
  loadCurrentChannelPost$ = this.actions$
    .ofType(MediaActions.GET_CURRENT_CHANNEL_POST)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.getCurrentPost(payload)
      .map(res => ({ type: MediaActions.GET_CURRENT_CHANNEL_POST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: MediaActions.GET_CURRENT_CHANNEL_POST_FAILED,
        payload: { errorStatus: res.status }
      }))
    );


  constructor(
      private actions$: Actions,
      private mediaService: MediaService
    ) {}
}
