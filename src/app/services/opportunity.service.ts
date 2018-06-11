import { Injectable } from '@angular/core';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class OpportunityService {

  constructor(private api: ApiService) { }

  /**
   * Create opportunity
   * @param request body
   */
  createOpportunity(reqBody: any) {
    return this.api.post('/portal/opportunity/create', reqBody);
  }

  // /**
  //  * Get opportunities
  //  * @param request body
  //  */
  // searchOpportunities(params: any) {
  //   return this.api.get('/portal/job/' + params.query + '/search/' + params.offset + '/' + params.limit);
  // }

  // /**
  //  * Get opportunity by id
  //  * @param id
  //  */
  // getOpportunity(jobId: string) {
  //   return this.api.get('/portal/job/', jobId);
  // }

  // /**
  //  * Apply for an opportunity
  //  * @param job id
  //  */
  // applyForAnOpportunity(reqBody: any) {
  //   return this.api.post('/portal/job/apply', reqBody);
  // }

  // /**
  //  * Get opportunity type count
  //  */
  // getOpportunityTypeCount() {
  //   return this.api.get('/portal/job/allType/counts');
  // }

  // /**
  //  * Get opportunities by filters like recommended, created opps
  //  */
  // getOpportunities(reqParams: any) {
  //   return this.api.get('/portal/opportunity/created/user/' + reqParams.offset + '/' + reqParams.limit);
  // }


  // /**
  //  * Get applied opportunities
  //  */
  // getAppliedOpportunities(reqParams: any) {
  //   return this.api.get('/portal/opportunity/applied/jobs/user/' + reqParams.offset + '/' + reqParams.limit );
  // }

  /**
   * File Uploader
   */
  fileUpload(formValue: any) {
    return this.uploadImage(formValue, formValue.handle);
  }

  /**
   * Upload Image to CDN
   * @TODO: check why it is failing on for single file end point
   */
  uploadImage(value: any, handle: string = '') {
    return this.api.postFile('/portal/cdn/media/upload/multiple?handle=' + handle, value.image);
  }

}
