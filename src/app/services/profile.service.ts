import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class ProfileService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private tokenService: TokenService,
    private http: Http
    ) { }

  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfile() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/network/spotfeed/profile/withCounts/loggedInProfile`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfileDetails() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/loggedInProfile`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInQuickAccess() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/fetch/profile/quickAccess/loggedIn`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInMedia(value) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/cdn/media/mediaResponse/0/10`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Channel profile.
   */
  getLoggedInChannel(value) {
    const headers = this.tokenService.getAuthHeader();

    const body = {
      'offset': 0,
      'limit': 10,
      'superType': 'channel',
      'owner': value
    }

    return this.http.post(this.apiLink + '/portal/network/spotfeed/search', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i ++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}
  /**
   *  Load image to database
   */
  uploadProfileImage(value) {
     console.log('uploadProfileImage');
     console.log(value.profileHandle);
     // console.log(value.image[0]);
     const data = value.image[0];
     const imageType = (data.substring("data:image/".length, data.indexOf(";base64")));
    // console.log(imageType);
    //  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  const token = currentUser.access_token; // your token
    //  const headers = new Headers({ 'Content-Type': 'application/json'});
    //  headers.append('Authorization', 'Bearer ' + token);
    // // const headers = this.tokenService.getAuthHeader();

     const fileData = new FormData();
     fileData.append('file', this.dataURItoBlob(value.image[0]), 'profile.' + imageType );

    // fileData.append('file', value.image[0]);
    // console.log(value.image[0]);
    return this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload?handle=J_47578AB2_AB1F_4B56_BB23_A0BFB26EFCE2DEEPASHREE_AEIONE_GMAIL_COM', fileData /* , { headers: headers } */)
         .map((data: Response) => data.json());
        // .map((data: Response) => {
        //   data = data.json();
        //   console.log(JSON.stringify(data));
        //   // const newData = {
        //   //   'profileImage' : data.
        //   // };

      //   return this.http.put('http://devservices.greenroom6.com:9000/api/1.0/portal/profile/updateProfile', JSON.stringify(data), { headers: headers })
      //   .map((res: Response) => {
      //     data.json()
      //   console.log(JSON.stringify(res));
      // });

        // });
  }

  saveProfileImage(value) {
    console.log(value);
    console.log('its comming');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.access_token; // your token
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + token);
  // const headers = this.tokenService.getAuthHeader();
   const val = {
     'profileImage' : value['SUCCESS'].repoPath
    }

    return this.http.put('http://devservices.greenroom6.com:9000/api/1.0/portal/profile/updateProfile', val , { headers: headers })
       .map((res: Response) => res.json());
  }
  /**
   * Current LoggedIn Channel profile.
   */
  userProfileUpdate(body) {
    const headers = this.tokenService.getAuthHeader();

    return this.http.put(this.apiLink + '/portal/profile/updateProfile', body, { headers: headers })
      .map((data) => data.json());
  }

  /**
   * Add User Work
   */
  addUserWork(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(this.apiLink + '/portal/profile/add/workandAwards', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Update User Work
   */
  updateUserWork(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.put(this.apiLink + '/portal/profile/update/workandAwards', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Update User Education
   */
  updateUserEducation(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.put(this.apiLink + '/portal/profile/update/qualification/course', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Get Current Work and Award
   */
  getCurrentWork(id) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(this.apiLink + '/portal/profile/get/workandAwards/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Delete User Work
   */
  deleteUserWork(id) {
    const headers = this.tokenService.getAuthHeader();
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.apiLink + '/portal/profile/delete/workandAwards/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Add User Education
   */
  addUserEducation(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(this.apiLink + '/portal/profile/add/qualification/course', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Delete User Education
   */
  deleteUserEducation(id) {
    const headers = this.tokenService.getAuthHeader();
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.apiLink + '/portal/profile/delete/qualification/course/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Create a channel
   */
  createChannel(req) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(`http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed`, req, { headers: headers })
      .map((data: Response) => data.json());
  }

}
