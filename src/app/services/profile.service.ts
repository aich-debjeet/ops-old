import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class ProfileService {
  private handle: string;
  private headers: any;
  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private api: ApiService,
    private http: Http
    ) {
      this.handle = this.api.getHandle();
      this.headers = this.api.getHeaders();
    }
  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfile() {
    return this.api.get('/portal/network/spotfeed/profile/withCounts/loggedInProfile/', '');
  }

  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfileDetails() {
    return this.api.get('/portal/loggedInProfile/', '');
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInQuickAccess() {
    return this.api.get('/portal/fetch/profile/quickAccess/loggedIn/', '');
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInMedia(value) {
    return this.api.get('/portal/cdn/media/mediaResponse/0/10/', '');
  }

  /**
   * Get home page spotfeeds
   */
  getHomePageSpotfeeds() {
      return this.api.get('/portal/cdn/spotfeed', '');
  }

  /**
   * Current LoggedIn Channel profile.
   */
  getLoggedInChannel(value: string, page: number = 1) {
    const perPage = 30;
    const offset = page === 1 ? 0 : page * perPage;
    const body = {
      'offset': offset,
      'limit': perPage,
      'superType': 'channel',
      'owner': value
    }

    return this.api.post('/portal/network/spotfeed/search', body);
  }


  /**
   * Get loggedin users channels.
   */
  getFollowingChannel(userHandle: string) {
    return this.api.get('/portal/network/spotfeed/following/profile/spotfeeds/' + userHandle , '');
  }

  /**
   * Find channels of a user
   */
  getUserChannel(handle: string) {
    // return this.api.get(`/portal/network/spotfeed/${handle}/channel`);
    return this.getLoggedInChannel(handle);
  }


  /**
   * Convert URI to Blob
   * @param dataURI
   */
  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }

    // Seperate out the MIME component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i ++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  /**
   * Upload Image
   * @param ImageObj
   */
  buildImageForm(formValue: any) {
    // let fileData:FormData = new FormData();
    const data = new FormData();
    // Check if image is present
    if (formValue.image && formValue.image[0]) {
      const imageData = formValue.image[0];
      const imageType = (imageData.substring('data:image/'.length, imageData.indexOf(';base64')));
      // Create random file name
      const randm = Math.random().toString(36).slice(2);
      const fileName = 'prof_' + randm + '.' + imageType;
      data.append('file', this.dataURItoBlob(imageData), fileName );
      return data;
    }
  }
   /**
   * Upload Image to CDN
   */
  uploadImage(value: any, handle: string = '') {
    console.log(value);
    return this.api.postFile('/portal/cdn/media/upload?handle=' + handle, value);
  }

  /**
   * Cover Image Uploader
   */
  coverImageUploader(payload: any) {
    const fileData = this.buildImageForm(payload);
    return this.uploadImage(fileData, payload.handle);
  }
  // coverImageUploader(payload: any) {
  //   const Files = this.imageHandler(payload.image);
  //   return this.uploadImage(Files, payload.handle);
  // }

  /**
   * Handle File
   */
  imageHandler(formValue: any) {
    let formData = new FormData();
    if (formValue.files && formValue.files[0]) {
      formData.append('file', formValue.files[0]);
    }
    return formData;
  }
  /**
   * Update profile Image to CDN
   * @TODO #1
   * When a user uploads an image with an existing file name in the system,
   * the response from CDN upload endpoint is giving the very previous image as response on success.
   */
  uploadProfileImage(formValue: any) {
    const fileData = this.buildImageForm(formValue);
    return this.uploadImage(fileData, formValue.handle);
  }

  /**
   * Update profile value with CDN path
   * @param imagePath
   */
  saveProfileImage(imagePath: any) {
    const profileImage = {
     'profileImage' : imagePath['SUCCESS'].repoPath
    }
    return this.userProfileUpdate(profileImage);
  }
  /**
   * Update Profile Object
   */
  userProfileUpdate(body: any) {
    return this.api.put('/portal/profile/updateProfile', body);
  }

  /**
   * Update Profile Object
   */
  userPasswordUpdate(data: any) {
    return this.api.put('/portal/auth/user/change', data);
  }

  /**
   * Add User Work
   */
  addUserWork(body: any) {
    return this.api.post('/portal/profile/add/workandAwards', body);
  }

  /**
   * Update User Work
   */
  updateUserWork(body: any) {
    return this.api.put('/portal/profile/update/workandAwards', body);
  }

  /**
   * Get Current Work and Award
   */
  getCurrentWork(id: string) {
    return this.api.get('/portal/profile/get/workandAwards/', id);
  }

  /**
   * Update User Education
   */
  updateUserEducation(body: any) {
    return this.api.put('/portal/profile/update/qualification/course', body);
  }

  /**
   * Add User Education
   */
  addUserEducation(body: any) {
    return this.api.post('/portal/profile/add/qualification/course', body);
  }

  /**
   * Delete User Work
   */
  deleteUserWork(id: string) {
    return this.api.delete('/portal/profile/delete/workandAwards/', id);
  }

  /**
   * Delete User Education
   */
  deleteUserEducation(id: string) {
    return this.api.delete('/portal/profile/delete/qualification/course/', id);
  }

  /**
   * Create a channel
   */
  createChannel(req: any) {
    return this.api.post('/portal/network/spotfeed', req);
  }

  /**
   * Create a channel
   */
  updateChannel(data: any) {
    return this.api.put('/portal/network/spotfeed/' + data.channelId, data.channelData);
  }

  /**
   * Attach Image to Cover
   */
  attachCoverImage(imageResp: any) {
    let profileImage = {};
    if (this.checkForSucces(imageResp)) {
      profileImage = {
        'extras' : {
          'coverImage' : imageResp['SUCCESS'].repoPath
        }
      }
    }
    return this.userProfileUpdate(profileImage);
  }

  /**
   * Load a user profile
   */
  loadProfileByUsername(userName: string) {
    return this.api.get('/portal/profile/user/username/' + userName);
  }

  /**
   * Load a user profile
   */
  followUser(handle: string) {
    const req  = {
      followedHandle : handle
    }
    return this.api.put('/portal/network/following/start', req);
  }

  /**
   * Load a user profile
   */
  unfollowUser(handle: string) {
    const req  = {
      followedHandle : handle
    }
    return this.api.put('/portal/network/following/stop', req);
  }

  /**
   * Follow a Channel
   */
  followChannel(req: any) {
    const channelId = req.channelId;
    const follow = req.state ? 'follow' : 'unfollow';
    return this.api.get('/portal/network/spotfeed/' + follow + '/byId/' + channelId);
  }
  /**
   * Check if the response has SUCCESS object in it
   */
  checkForSucces(object: any): boolean {
    if (object['SUCCESS'] == null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Pagination Helper
   */
  pagination(page: number = 1, perPage: number = 20) {
    const p = page === 1 ? 0 : page * perPage;
    return `${p}/${perPage}`;
  }

  /**
   * Get User media
   */
  getUserMedia(payload: any) {
    const params = payload.handle + '/' + payload.page_start + '/' + payload.page_end;
    return this.api.get('/portal/cdn/media/otherProfile/', params);
  }

  /**
   * Post to Media
   */
  postMediaToChannel(payload: any) {
    console.log('SERVICE__PROFILE', payload);
    const channelId = payload.channelId;
    const req = payload.req;
    return this.api.put('/portal/network/spotfeed/' + channelId, req);
  }

  /**
   * Fetching individual spotfeeds data
   */
  getSpotfeedDetails(data: any) {
    const params = `${data.handle}/${data.page_start}/${data.page_end}`;
    console.log('pagination: ' + params);
    return this.api.get('/portal/cdn/spotfeed/inner/', params);
  }

  /**
   * Delete a channel
   */
  deleteChannel(channelId: string) {
    return this.api.delete('/portal/network/spotfeed/', channelId, true);
  }

  /*
   * Current LoggedIn user following channel
   */
  getLoggedInUserFollowingChannel(value: string) {
    // console.log('handle: ' + value);
    return this.api.get('/portal/network/spotfeed/following/profile/spotfeeds/' + value, '');
  }

  /**
   * Current user status load
   */
  currentUserStatus(handleId: string) {
    return this.api.get('/portal/network/feeds/' + handleId);
  }

  /**
   * Pin channel
   */
  userChannelPin(body: any) {
    return this.api.put('/portal/network/spotfeed/pinspotfeed/pin', body);
  }

  /**
   * Unpin channel
   */
  userChannelUnpin(body: any) {
    return this.api.put('/portal/network/spotfeed/unpinspotfeed/unpin', body);
  }

  /**
   * [TEMP] Get all profiles
   */
  getAllProfiles() {
    return this.api.get('/portal/profile/0/50', '');
  }
}
