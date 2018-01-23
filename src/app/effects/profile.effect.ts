import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { ProfileService } from '../services/profile.service';
import { ProfileActions } from '../actions/profile.action';

@Injectable()
export class ProfileEffect {
  /**
   * Get LoggedIn User profile
   */
  @Effect()
  loadUserProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInProfile()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   *  Get LoggedIn User Quick Access
   */
  @Effect()
  loadUserQuickAcess$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInQuickAccess()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get LoggedIn user full profile details
   */
  @Effect()
  loadUserProfileDetails$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInProfileDetails()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get current user media profile
   */
  @Effect()
  loadUserMedia$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getUserMedia(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_USER_MEDIA_FAILED,
        payload: { errorStatus: res.status }
      }))
    );


      /**
   * Get current user following posts
   */
  @Effect()
  loadUserFollowingPost$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_FOLLOWING_POSTS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getUserFollowingPosts(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_USER_FOLLOWING_POSTS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get home page spotfeed
   */
  @Effect()
  loadHomePageSpotfeeds$ = this.actions$
    .ofType(ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getHomePageSpotfeeds()
      .map(res => ({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );


  /**
   * Get current user channel profile
   */
  @Effect()
  loadUserChannel$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInChannel(payload)
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED,
        payload: { errorStatus: res.status }
      }))
    );


  /**
   * Get current user following channel
   */
  @Effect()
  loadUserFollowingChannel$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInUserFollowingChannel(payload)
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get current user channel profile
   */
  @Effect()
  userProfileUpdate$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userProfileUpdate(payload)
      .map(res => ({ type: ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_PROFILE_UPDATE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Add Current user work
   */
  @Effect()
  addUserWork$ = this.actions$
    .ofType(ProfileActions.ADD_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addUserWork(payload)
      .map(res => ({ type: ProfileActions.ADD_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.ADD_USER_WORK_FAILED, payload: res }))
    );

  // /**
  //  * Edit Current user work
  //  */
  // @Effect()
  // editUserWork$ = this.actions$
  //   .ofType(ProfileActions.EDIT_USER_WORK)
  //   .map(toPayload)
  //   .switchMap((payload) => this.profileService.editUserWork(payload)
  //     .map(res => ({ type: ProfileActions.EDIT_USER_WORK_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: ProfileActions.EDIT_USER_WORK_FAILED, payload: res }))
  //   );

  /**
   * Get Current work and award
   */
  @Effect()
  getCurrentWork$ = this.actions$
    .ofType(ProfileActions.GET_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getCurrentWork(payload)
      .map(res => ({ type: ProfileActions.GET_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_USER_WORK_FAILED, payload: res }))
    );

  /**
   * Update Current work and award
   */
  @Effect()
  updateCurrentWork$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.updateUserWork(payload)
      .map(res => ({ type: ProfileActions.UPDATE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.UPDATE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * User Work Update Success
   */
  @Effect()
  userWorkUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * Delete Current user work
   */
  @Effect()
  deleteUserWork$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserWork(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * Add Current user Education
   */
  @Effect()
  addUserEducation$ = this.actions$
    .ofType(ProfileActions.ADD_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addUserEducation(payload)
      .map(res => ({ type: ProfileActions.ADD_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.ADD_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * Delete Current user Education
   */
  @Effect()
  deleteUserEducation$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserEducation(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * Update Current Education
   */
  @Effect()
  updateCurrentEducation$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.updateUserEducation(payload)
      .map(res => ({ type: ProfileActions.UPDATE_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.UPDATE_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * User Work Update Success
   */
  @Effect()
  userEducationUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * DWC Media Update
   */
  CHANGE_DWC_MEDIA_STATE

  /**
   * Delete Current user Award
   */
  @Effect()
  updateDWCStatus$ = this.actions$
    .ofType(ProfileActions.CHANGE_DWC_MEDIA_STATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.changeMediaState(payload)
      .map(res => ({ type: 'NONE', payload: res }))
      .catch((res) => Observable.of({ type: 'NONE', payload: res }))
    );

  /**
   * Edit Current user Award
   */
  // @Effect()
  // editUserAward$ = this.actions$
  //   .ofType(ProfileActions.EDIT_USER_WORK)
  //   .map(toPayload)
  //   .switchMap((payload) => this.profileService.editUserWork(payload)
  //     .map(res => ({ type: ProfileActions.EDIT_USER_WORK_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: ProfileActions.EDIT_USER_WORK_FAILED, payload: res }))
  //   );

  /**
   * Delete Current user Award
   */
  @Effect()
  deleteUserAward$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserWork(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * 401 error
   */
  // @Effect() errorStatus401$ = this.actions$
  //   .map(action => action.payload)
  //   .filter(payload => payload && payload.errorStatus === 401)
  //   .switchMap(payload => {
  //       localStorage.removeItem('currentUser');
  //       this.router.navigate(['/login']);
  //       return Observable.empty();
  //   });

  /**
   * User Work Delete Success
   */
  @Effect()
  userWorkDeleteSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * User Education Delete Success
   */
  @Effect()
  userWorkEducationSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * User Work Add Success
   */
  @Effect()
  userWorkAddSuccess$ = this.actions$
    .ofType(ProfileActions.ADD_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * Profile Update Success
   */
  @Effect()
  userProfileUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE }))

  @Effect()
  userProfileUpdateDetailsSuccess$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * User Education Add Success
   */
  @Effect()
  userEducationAddSuccess$ = this.actions$
    .ofType(ProfileActions.ADD_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * Save Cover Image
   */

   @Effect()
    saveCoverImage$ = this.actions$
      .ofType(ProfileActions.PROFILE_COVER_UPDATE)
      .map(toPayload)
      .switchMap((payload) => this.profileService.coverImageUploader(payload)
        .map(res => ({ type: ProfileActions.PROFILE_COVER_UPDATE_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: ProfileActions.PROFILE_COVER_UPDATE_FAILED, payload: res }))
      );

  /**
   *  Save image to ProfileUI
   */
     @Effect()
     saveCoverImageSuccess$ = this.actions$
     .ofType(ProfileActions.PROFILE_COVER_UPDATE_SUCCESS)
     .map(toPayload)
     .switchMap((payload) => this.profileService.attachCoverImage(payload)
       .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))
       .catch((res) => Observable.of({ type: ProfileActions.PROFILE_COVER_URL_UPDATE_FAILED, payload: res }))
      );
/**
 *  Load image to database
 */
  @Effect()
  loadProfileImage$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_IMAGE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.uploadProfileImage(payload)
      .map(res => ({ type: ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_PROFILE_IMAGE_FAILED, payload: res }))
    );


  /**
   *  Save image to ProfileUI
   */
   @Effect()
   loadProfileImageSuccess$ = this.actions$
   .ofType(ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS)
   .map(toPayload)
   .switchMap((payload) => this.profileService.saveProfileImage(payload)
     .map(res => ({ type: ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS, payload: res }))
     .catch((res) => Observable.of({ type: ProfileActions.SAVE_PROFILE_IMAGE_FAILED, payload: res }))
    );

  /**
   *  Save on profile image url
   */
  @Effect()
  imageUrlUpdate$ = this.actions$
    .ofType(ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS)
    .mergeMap(reachedThreshold => {
       return Observable.of({  type: ProfileActions.LOAD_CURRENT_USER_PROFILE })
    });

  @Effect()
  profileUrlUpdate$ = this.actions$
    .ofType(ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS)
    .mergeMap(reachedThreshold => {
      return Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS })
    });



  /**
   * Get current user channel profile
   */
  @Effect()
  saveUserChannel$ = this.actions$
    .ofType(ProfileActions.CHANNEL_SAVE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.createChannel(payload)
      .map(res => ({ type: ProfileActions.CHANNEL_SAVE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.CHANNEL_SAVE_FAILED, payload: res }))
    );

  /**
   * Update channel
   */
  @Effect()
  updateChannel$ = this.actions$
    .ofType(ProfileActions.CHANNEL_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.updateChannel(payload)
      .map(res => ({ type: ProfileActions.CHANNEL_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.CHANNEL_UPDATE_FAILED, payload: res }))
    );

  /**
   * Get current user channel profile
   */
  @Effect()
  loadProfile$ = this.actions$
    .ofType(ProfileActions.PROFILE_LOAD)
    .map(toPayload)
    .switchMap((payload) => this.profileService.loadProfileByUsername(payload)
      .map(res => ({ type: ProfileActions.PROFILE_LOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PROFILE_LOAD_FAILED, payload: res }))
    );

  /**
   * Get user channels
   */
  @Effect()
  loadChannel$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getUserChannel(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_USER_CHANNEL_FAILED, payload: res }))
    );

  /**
   * Follow Profile
   */
  @Effect()
  followProfile$ = this.actions$
    .ofType(ProfileActions.PROFILE_FOLLOW)
    .map(toPayload)
    .switchMap((payload) => this.profileService.followUser(payload)
      .map(res => ({ type: ProfileActions.PROFILE_FOLLOW_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PROFILE_FOLLOW_FAILED, payload: res }))
    );

  /**
   * UnFollow Profile
   */
  @Effect()
  unfollowProfile$ = this.actions$
    .ofType(ProfileActions.PROFILE_UNFOLLOW)
    .map(toPayload)
    .switchMap((payload) => this.profileService.unfollowUser(payload)
      .map(res => ({ type: ProfileActions.PROFILE_UNFOLLOW_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PROFILE_UNFOLLOW_FAILED, payload: res }))
    );

  /**
   * Follow Profile
   */
  @Effect()
  followChannel$ = this.actions$
    .ofType(ProfileActions.CHANNEL_FOLLOW)
    .map(toPayload)
    .switchMap((payload) => this.profileService.followChannel(payload)
      .map(res => ({ type: ProfileActions.CHANNEL_FOLLOW_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.CHANNEL_FOLLOW_FAILED, payload: res }))
    );

    /**
   * Get user channels
   */
  @Effect()
  postMediaChannel$ = this.actions$
    .ofType(ProfileActions.POST_CHANNEL_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.profileService.postMediaToChannel(payload)
      .map(res => ({ type: ProfileActions.POST_CHANNEL_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.POST_CHANNEL_MEDIA_FAILED, payload: res }))
    );

  /**
   * Get spotfeed details
   */
  @Effect()
  loadSpotfeedDetails$ = this.actions$
    .ofType(ProfileActions.GET_SPOTFEED_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getSpotfeedDetails(payload)
      .map(res => ({ type: ProfileActions.GET_SPOTFEED_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.GET_SPOTFEED_DETAILS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Delete a Channel
   */
  @Effect()
  deleteChannel$ = this.actions$
    .ofType(ProfileActions.CHANNEL_DELETE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteChannel(payload)
      .map(res => ({ type: ProfileActions.CHANNEL_DELETE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.CHANNEL_DELETE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Exsisting password update
   */
  @Effect()
  passwordUpdate$ = this.actions$
    .ofType(ProfileActions.USER_PASSWORD_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userPasswordUpdate(payload)
      .map(res => ({ type: ProfileActions.USER_PASSWORD_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.USER_PASSWORD_UPDATE_FAILED, payload: res }))
    );

   /**
   * Current User status load
   */
  @Effect()
  userStatusLoad$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_STATUS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.currentUserStatus(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_STATUS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_USER_STATUS_FAILED, payload: res }))
    );

   /**
   * Pin channel
   */
  @Effect()
  pinChannel$ = this.actions$
    .ofType(ProfileActions.PIN_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userChannelPin(payload)
      .map(res => ({ type: ProfileActions.PIN_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PIN_CHANNEL_FAILED, payload: res }))
    );

   /**
   * UnPin channel
   */
  @Effect()
  unpinChannel$ = this.actions$
    .ofType(ProfileActions.UNPIN_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userChannelUnpin(payload)
      .map(res => ({ type: ProfileActions.UNPIN_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.UNPIN_CHANNEL_FAILED, payload: res }))
    );

  /**
   *  Unpin sucess loadload Quick Access
   */
  @Effect()
  unpinChannelSuccess$ = this.actions$
    .ofType(ProfileActions.UNPIN_CHANNEL_SUCCESS)
    .mergeMap(reachedThreshold => {
       return Observable.of({  type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS })
    });

  /**
   *  pin sucess loadload Quick Access
   */
  @Effect()
  pinChannelSuccess$ = this.actions$
    .ofType(ProfileActions.PIN_CHANNEL_SUCCESS)
    .mergeMap(reachedThreshold => {
       return Observable.of({  type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS })
    });

  /**
   * [TEMP] Load all profiles
   */
  @Effect()
  loadProfiles$ = this.actions$
    .ofType(ProfileActions.LOAD_ALL_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getAllProfiles()
      .map(res => ({ type: ProfileActions.LOAD_ALL_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_ALL_PROFILES_FAILED, payload: res }))
    );

  /**
   *  Load my Directory
   */
  @Effect()
  directory$ = this.actions$
    .ofType(ProfileActions.LOAD_DIRECTORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.loadDirectory(payload)
      .map(res => ({ type: ProfileActions.LOAD_DIRECTORY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_DIRECTORY_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get List of Block Users
   */
  @Effect()
  loadBlockedUsers$ = this.actions$
    .ofType(ProfileActions.LOAD_BLOCK_USERS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getBlockedUsers( payload )
      .map(res => ({ type: ProfileActions.LOAD_BLOCK_USERS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_BLOCK_USERS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * unBlock Users
   */
  @Effect()
  UnBlockUsers$ = this.actions$
  .ofType(ProfileActions.UNBLOCK_USER)
  .map(toPayload)
  .switchMap((payload) => this.profileService.unBlockUser( payload )
    .map(res => ({ type: ProfileActions.UNBLOCK_USER_SUCCESS, payload: res }))
    .catch((res) => Observable.of({
      type: ProfileActions.UNBLOCK_USER_FAILED,
      payload: { errorStatus: res.status }
    }))
  );

  // @Effect()
  // UpdateblockedUsers$ = this.actions$
  // .ofType(ProfileActions.UNBLOCK_USER_SUCCESS)
  // .map(toPayload)
  // .switchMap((payload) => this.profileService.getBlockedUsers( payload )
  //   .map(res => ({ type: ProfileActions.LOAD_BLOCK_USERS_SUCCESS, payload: res }))
  //   .catch((res) => Observable.of({
  //     type: ProfileActions.LOAD_BLOCK_USERS_FAILED,
  //     payload: { errorStatus: res.status }
  //   }))
  // );

  /**
   * Get default notification settings
   */
  @Effect()
  getDeafultNotifi$ = this.actions$
    .ofType(ProfileActions.DEFAULT_NOTIFICATION_SETTINGS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getdefaultNotifications()
      .map(res => ({ type: ProfileActions.DEFAULT_NOTIFICATION_SETTINGS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.DEFAULT_NOTIFICATION_SETTINGS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get imported profile by username
   */
  @Effect()
  getImportedProfile$ = this.actions$
    .ofType(ProfileActions.GET_IMPORTED_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getImportedProfile(payload)
      .map(res => ({ type: ProfileActions.GET_IMPORTED_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_IMPORTED_PROFILE_FAILED, payload: res }))
    );

  /**
   * Get following profiles by handle
   */
  @Effect()
  getFollowings$ = this.actions$
    .ofType(ProfileActions.GET_FOLLOWING_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getFollowings(payload)
      .map(res => ({ type: ProfileActions.GET_FOLLOWING_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_FOLLOWING_PROFILES_FAILED, payload: res }))
    );

  /**
   * Get followers profiles by handle
   */
  @Effect()
  getFollowers$ = this.actions$
    .ofType(ProfileActions.GET_FOLLOWER_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getFollowers(payload)
      .map(res => ({ type: ProfileActions.GET_FOLLOWER_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_FOLLOWER_PROFILES_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private profileService: ProfileService
  ) { }

}
