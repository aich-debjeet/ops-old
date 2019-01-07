import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx'
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
  * spotted users
  */
  @Effect()
  loadSpottedUsers$ = this.actions$
    .ofType(ProfileActions.GET_MEDIA_SPOTTED_USERS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.loadSpottedUsers(payload)
      .map(res => ({ type: ProfileActions.GET_MEDIA_SPOTTED_USERS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_MEDIA_SPOTTED_USERS_FAILED, payload: res }))
    );

  /**
  * post status
  */
  @Effect()
  userStatusLoad$ = this.actions$
    .ofType(ProfileActions.POST_STATUS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.postStatus(payload)
      .map(res => ({ type: ProfileActions.POST_STATUS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.POST_STATUS_FAILED, payload: res }))
    );

  @Effect()
  removeCoverImage$ = this.actions$
    .ofType(ProfileActions.REMOVE_COVER_IMAGE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.removeCoverImage(payload)
      .map(res => ({ type: ProfileActions.REMOVE_COVER_IMAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.REMOVE_COVER_IMAGE_FAILED, payload: res }))
    );

  @Effect()
  removeProfileImage$ = this.actions$
    .ofType(ProfileActions.REMOVE_PROFILE_IMAGE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.removeProfileImage(payload)
      .map(res => ({ type: ProfileActions.REMOVE_PROFILE_IMAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.REMOVE_PROFILE_IMAGE_FAILED, payload: res }))
    );

  @Effect()
  postChannelStatus$ = this.actions$
    .ofType(ProfileActions.POST_CHANNEL_STATUS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.postChannelStatus(payload)
      .map(res => ({ type: ProfileActions.POST_CHANNEL_STATUS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.POST_CHANNEL_STATUS_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  portRemoveMediaFromCategory$ = this.actions$
    .ofType(ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT)
    .map(toPayload)
    .switchMap((payload) => this.profileService.portRemoveMediaFromCategory(payload)
      .map(res => ({ type: ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  portDeleteCategory$ = this.actions$
    .ofType(ProfileActions.PORTFOLIO_DELETE_CATEGORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.portDeleteCategory(payload)
      .map(res => ({ type: ProfileActions.PORTFOLIO_DELETE_CATEGORY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PORTFOLIO_DELETE_CATEGORY_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  portUpdateCategoryName$ = this.actions$
    .ofType(ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME)
    .map(toPayload)
    .switchMap((payload) => this.profileService.portUpdateCategoryName(payload)
      .map(res => ({ type: ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  portfolioPublishAction$ = this.actions$
    .ofType(ProfileActions.PORTFOLIO_PUBLISH_ACTION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.portfolioPublishAction(payload)
      .map(res => ({ type: ProfileActions.PORTFOLIO_PUBLISH_ACTION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PORTFOLIO_PUBLISH_ACTION_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  portfolioGetDisplayMedia$ = this.actions$
    .ofType(ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getPortfolioDisplayMedia(payload)
      .map(res => ({ type: ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA_FAILED, payload: res }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  getChannelsForPortfolio$ = this.actions$
    .ofType(ProfileActions.GET_USERS_CHANNELS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getChannelsForPortfolio(payload)
      .map(res => ({ type: ProfileActions.GET_USERS_CHANNELS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.GET_USERS_CHANNELS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  getMediaForPortfolio$ = this.actions$
    .ofType(ProfileActions.GET_USER_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getMediaForPortfolio(payload)
      .map(res => ({ type: ProfileActions.GET_USER_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.GET_USER_MEDIA_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  getPortfolioCategories$ = this.actions$
    .ofType(ProfileActions.GET_PORTFOLIO_CATEGORIES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getPortfolioCategories(payload)
      .map(res => ({ type: ProfileActions.GET_PORTFOLIO_CATEGORIES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.GET_PORTFOLIO_CATEGORIES_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  addMediaToCategory$ = this.actions$
    .ofType(ProfileActions.ADD_MEDIA_TO_CATEGORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addMediaToCategory(payload)
      .map(res => ({ type: ProfileActions.ADD_MEDIA_TO_CATEGORY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.ADD_MEDIA_TO_CATEGORY_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * for: portfolio
   */
  @Effect()
  addPortfolioCategory$ = this.actions$
    .ofType(ProfileActions.ADD_PORTFOLIO_CATEGORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addPortfolioCategory(payload)
      .map(res => ({ type: ProfileActions.ADD_PORTFOLIO_CATEGORY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.ADD_PORTFOLIO_CATEGORY_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

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
   * Get LoggedIn user data details
   */
  @Effect()
  loadUserDataDetails$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_DATA_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInUserDetails()
      .map(res => ({ type: ProfileActions.LOAD_USER_DATA_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_USER_DATA_DETAILS_FAILED,
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
   * update user details
   */
  @Effect()
  userDetaileUpdate$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userDetailUpdate(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_USER_UPDATE_FAILED,
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
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

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
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

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
   * User Work Delete Success
   */
  @Effect()
  userWorkDeleteSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * User Education Delete Success
   */
  @Effect()
  userWorkEducationSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

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
   *  Save on profile image url
   */
  @Effect()
  imageUrlUpdate$ = this.actions$
    .ofType(ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS)
    .mergeMap(reachedThreshold => {
      return Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE })
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
   * Get current user channel profile
   */
  @Effect()
  profLoadProfile$ = this.actions$
    .ofType(ProfileActions.PORTFOLIO_PROFILE_LOAD)
    .map(toPayload)
    .switchMap((payload) => this.profileService.loadProfileByUsernameForPortfolio(payload)
      .map(res => ({ type: ProfileActions.PORTFOLIO_PROFILE_LOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.PORTFOLIO_PROFILE_LOAD_FAILED, payload: res }))
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
  currentUserStatus$ = this.actions$
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
      return Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS })
    });

  /**
   *  pin sucess loadload Quick Access
   */
  @Effect()
  pinChannelSuccess$ = this.actions$
    .ofType(ProfileActions.PIN_CHANNEL_SUCCESS)
    .mergeMap(reachedThreshold => {
      return Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS })
    });

  /**
   * [TEMP] Load all profiles
   */
  @Effect()
  loadProfiles$ = this.actions$
    .ofType(ProfileActions.LOAD_ALL_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getAllProfiles(payload)
      .map(res => ({ type: ProfileActions.LOAD_ALL_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_ALL_PROFILES_FAILED, payload: res }))
    );

  @Effect()
  loadProfilesProf$ = this.actions$
    .ofType(ProfileActions.LOAD_ALL_PROFILES_PROF)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getAllProfilesProf(payload)
      .map(res => ({ type: ProfileActions.LOAD_ALL_PROFILES_PROF_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_ALL_PROFILES_PROF_FAILED, payload: res }))
    );

  /**
   * Get List of Block Users
   */
  @Effect()
  loadBlockedUsers$ = this.actions$
    .ofType(ProfileActions.LOAD_BLOCK_USERS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getBlockedUsers(payload)
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
    .switchMap((payload) => this.profileService.unBlockUser(payload)
      .map(res => ({ type: ProfileActions.UNBLOCK_USER_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.UNBLOCK_USER_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Block users
   */
  @Effect()
  blockUser$ = this.actions$
    .ofType(ProfileActions.BLOCK_USER)
    .map(toPayload)
    .switchMap((payload) => this.profileService.blockUser(payload)
      .map(res => ({ type: ProfileActions.BLOCK_USER_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.BLOCK_USER_FAILED, payload: res })
      )
    );

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
  getFollowingProfiles$ = this.actions$
    .ofType(ProfileActions.GET_FOLLOWING_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getFollowingProfiles(payload)
      .map(res => ({ type: ProfileActions.GET_FOLLOWING_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_FOLLOWING_PROFILES_FAILED, payload: res }))
    );

  /**
   * Get followers profiles by handle
   */
  @Effect()
  getFollowerProfiles$ = this.actions$
    .ofType(ProfileActions.GET_FOLLOWER_PROFILES)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getFollowerProfiles(payload)
      .map(res => ({ type: ProfileActions.GET_FOLLOWER_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_FOLLOWER_PROFILES_FAILED, payload: res }))
    );

  /**
   *get network sent receipient list
   */
  @Effect()
  getNetworkList$ = this.actions$
    .ofType(ProfileActions.SENT_REQUEST_LIST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getNetworkRequestList(payload)
      .map(res => ({ type: ProfileActions.SENT_REQUEST_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.SENT_REQUEST_LIST_FAILED, payload: res }))
    );

  /**
   * SENT NETWORK REQUEST
   */
  @Effect()
  setNetworkRequest$ = this.actions$
    .ofType(ProfileActions.SENT_NETWORK_REQUEST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.sentNetworkRequest(payload)
      .map(res => ({ type: ProfileActions.SENT_NETWORK_REQUEST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.SENT_NETWORK_REQUEST_FAILED, payload: res }))
    );

  @Effect()
  communityMediaPost$ = this.actions$
    .ofType(ProfileActions.COMMUNITY_MEDIA_POST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.communityMediaPost(payload)
      .map(res => ({ type: ProfileActions.COMMUNITY_MEDIA_POST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.COMMUNITY_MEDIA_POST_FAILED, payload: res }))
    );

    /**
     * effects: post story
     */
    @Effect()
    storyPost$ = this.actions$
    .ofType(ProfileActions.POST_STORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.storyPost(payload)
    .map(res => ({ type: ProfileActions.POST_STORY_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: ProfileActions.POST_STORY_FAILED, payload: res }))
    );

    /**
     * Get users story
     */
    @Effect()
    storyGet$ = this.actions$
    .ofType(ProfileActions.GET_MY_STORY)
    .map(toPayload)
    .switchMap((payload) => this.profileService.storyGet(payload)
    .map(res => ({ type: ProfileActions.GET_MY_STORY_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: ProfileActions.GET_MY_STORY_FAILED, payload: res }))
    );

  /**
   * GET PENDING REQUEST LIST
   */
  @Effect()
  getPendingRequest$ = this.actions$
    .ofType(ProfileActions.GET_PENDING_REQUEST_LIST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getPendingRequest(payload)
      .map(res => ({ type: ProfileActions.GET_PENDING_REQUEST_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_PENDING_REQUEST_LIST_FAILED, payload: res }))
    );

  /**
   * GET ACTIVE CONNECTIONS
   */
  @Effect()
  getConnectinsList$ = this.actions$
    .ofType(ProfileActions.GET_ACTIVE_CONNECTIONS_LIST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getConnectionList(payload)
      .map(res => ({ type: ProfileActions.GET_ACTIVE_CONNECTIONS_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_ACTIVE_CONNECTIONS_LIST_FAILED, payload: res }))
    );

  /**
   * Accept a network request
   */
  @Effect()
  acceptRequest$ = this.actions$
    .ofType(ProfileActions.ACCEPT_NETWORK_REQUEST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.acceptNetworkrequest(payload)
      .map(res => ({ type: ProfileActions.ACCEPT_NETWORK_REQUEST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.ACCEPT_NETWORK_REQUEST_FAILED, payload: res }))
    );

  /**
   * cancel a network request
   */
  @Effect()
  cancelRequest$ = this.actions$
    .ofType(ProfileActions.CANCEL_NETWORK_REQUEST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.cancelSentrequest(payload)
      .map(res => ({ type: ProfileActions.CANCEL_NETWORK_REQUEST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.CANCEL_NETWORK_REQUEST_FAILED, payload: res }))
    );

  /**
   * cancel a network request
   */
  @Effect()
  declineRequest$ = this.actions$
    .ofType(ProfileActions.DECLINE_NETWORK_REQUEST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.declinerequest(payload)
      .map(res => ({ type: ProfileActions.DECLINE_NETWORK_REQUEST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DECLINE_NETWORK_REQUEST_FAILED, payload: res }))
    );

  /**
   * Media Comment ALL
   */
  @Effect()
  commentMore$ = this.actions$
    .ofType(ProfileActions.COMMENT_MORE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.fetchMediaComment(payload)
      .map(res => ({ type: ProfileActions.COMMENT_MORE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.COMMENT_MORE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Trending Post
   */
  @Effect()
  TrandingPost$ = this.actions$
    .ofType(ProfileActions.TRENDING_POST)
    .map(toPayload)
    .switchMap((payload) => this.profileService.trendingPost()
      .map(res => ({ type: ProfileActions.TRENDING_POST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.TRENDING_POST_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) { }

}
