import { Handle } from 'ng2-img-cropper/src/model/handle';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class OrganizationService {
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
   * Registration of Organization
   */
  regOrganization(body: any) {
      // console.log(body);
      return this.api.post('/portal/organization', body);
  }

  /**
   * Update Organization
   */
  updateOrganization(data: any) {
      return this.api.put(`/portal/organization/${data.handle}`, data.body);
  }

  /**
   * Get org profile details
   */
  detailOrganization(username: any) {
      // console.log(username);
      return this.api.get(`/portal/organization/user/username/${username}`);
  }



  // --- IT SHOULD BE MOVE COMMEN SERVICE ---
  /**
   * Update profile Image to CDN
   */
  uploadImageServer(formValue: any) {
    const fileData = this.buildImageForm(formValue);
    fileData.append('upload_for', formValue.imageType);
    fileData.append('owner_type', 'organization');
    return this.uploadImage(fileData, formValue.handle);
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
    return this.api.postFile('/portal/cdn/media/auth/upload?handle=' + handle, value);
  }

  // ------- DONE --------

  /**
     * Load organization
     */
    loadOrganization(orgHandle: string) {
      return this.api.get('/portal/organization/' + orgHandle);
    }

    delOrganization(handle: any) {
      // console.log(handle);
      return this.api.delete('/portal/organization', handle);
    }

    getReceipientDetails (value: string) {
      return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/10', { headers: this.headers })
      .map((data: Response) => data.json());
    }
    getOrganizationMembers(handle: any) {
      // console.log('api callin')
      return this.http.get(this.apiLink + '/portal/organization/members/' + handle + '/0/10', { headers: this.headers })
      .map((data: Response) => data.json());
    }

   /**
     * getting default settings of an Organization
     */
    getDefaultSettings(handle: any) {
      // console.log('api callin')
      return this.http.get(this.apiLink + '/portal/organization/get/settings/' + handle , { headers: this.headers })
      .map((data: Response) => data.json());
    }

  /**
   * Get channels of logged in org
   */
  loadOrgChannels(value: string, page: number = 1) {
    // console.log('loadOrgChannels', value);
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
   * Org get navigation details
   */
  orgNavigationDetails(orgUsername: string) {
    return this.api.get('/portal/network/spotfeed/organization/withCounts/' + orgUsername);
  }

  /**
   * Invite members to join org
   */
  inviteMember(data: any) {
    // this.updateToken();
    const reqBody = {
      memberHandle: data.userHandle,
      isAdmin: true,
      status: ''
    };
    return this.api.put('/portal/organization/inviteMember/' + data.orgHandle, reqBody);
  }

}
