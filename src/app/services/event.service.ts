import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class EventService {
  private apiLink: string = environment.API_ENDPOINT;
  private handle: string;
  private headers: any;
  constructor(
    private api: ApiService,
    private http: Http
    ) {
      this.handle = this.api.getHandle();
      this.headers = this.api.getHeaders();
    }

    /**
     * Search Banner
     */

    searchBanner(){
      return this.api.get('/portal/event/get/eventsBanner');
    }

    /**
     * list of attendee
     */

    listOfAttendee(id: any){
      return this.api.get('/portal/eventAttendee/' + id + '/0/10');
    }

  /**
   * Event Registration
   */
  eventReg(body: any) {
    return this.api.post('/portal/event/create', body);
  }

  /**
   * Event Delete
   */
  eventDel(payload) {
    return this.api.put('/portal/event/delete/' + payload, {})
  }


  /**
   * Event Get details
   */
  eventDetail(id: any) {
      return this.api.get('/portal/event/' + id , '');
  }

  /**
   * Event Listing Page
   */
  eventList(id: any) {
      return this.api.get('/portal/event/all/0/50' , '');
  }

  /**
   * Event Get all industry
   */
  getAllIndustry() {
      return this.api.get('/portal/industry', '');
  }
  /**
   * Event Get Event Types
   */
  getEventsType() {
    return this.api.get('/portal/eventTypes');
  }
  /**
   * Event Get all industry
   */
  getAllEventType() {
      return this.api.get('/portal/event/get/eventType', '');
  }

   /**
   * Upload Image to CDN
   * @TODO: check why it is failing on for single file end point
   */
  uploadImage(value: any, handle: string = '') {
    return this.api.postFile('/portal/cdn/media/upload/multiple?handle=' + handle, value.image);
  }

  /**
   * Load my status
   */
  attendUpdate(data: any) {
    const body = {
      status: data.status
    }
    return this.api.put( '/portal/event/attend/' + data.id, body);
  }

  /**
   * Event search data
   */
  eventSearchData(data: any) {
    return this.api.post( '/portal/event/search', data);
  }

  /**
   * File Uploader
   * @TODO DONT DONT DRY, reuse this function ?
   * @param formValue
   * @param type
   */
  fileUpload(formValue: any, type: string = 'base64') {
    let fileData;
    if (type === 'base64') {
      fileData = this.buildImageForm(formValue);
    } else {
      fileData = formValue;
    }
    return this.uploadImage(fileData, formValue.handle);
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
   * dwc contact form submit
   */
  dwcContactUs(data: any) {
    return this.api.post( '/portal/contactus', data);
  }

  /**
   * dwc payment request
   */
  dwcPaymentRequest() {
    return this.api.get( '/portal/dcw/application/payment/request', '');
  }

  /**
   * DWC Form Reg @param value
   */
  dwcReg(value: any) {
      return this.api.post( '/portal/application/postApplication', value);
  }
}
