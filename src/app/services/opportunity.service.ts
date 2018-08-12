import { Injectable } from '@angular/core';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class OpportunityService {

  constructor(private api: ApiService) { }

  /**
   * cancel application
   */
  cancelApplication(params: any) {
    return this.api.delete('/portal/opportunity/job/cancel/application/' + params['jobId'], '');
  }

  /**
   * remove opportunity application
   */
  removeApplication(appDetails: any) {
    return this.api.delete('/portal/opportunity/application/' + appDetails.id, '');
  }

  /**
   * load opportunity specific applications
   */
  getApplications(reqBody: any) {
    return this.api.put('/portal/opportunity/applied/user', reqBody);
  }

  /**
   * Create opportunity
   * @param request body
   */
  createOpportunity(reqBody: any) {
    return this.api.post('/portal/opportunity/create', reqBody);
  }

  /**
   * Update opportunity
   * @param request body
   */
  updateOpportunity(reqBody: any) {
    return this.api.put('/portal/opportunity/update/' + reqBody.id, reqBody.data);
  }

  /**
   * Search opportunities
   * @param params: request body
   */
  searchOpportunities(params: any) {
    return this.api.put('/portal/job', params);
  }

  /**
   * Get opportunity by id
   * @param id
   */
  getOpportunity(jobId: string) {
    return this.api.get('/portal/opportunity/', jobId);
  }

  /**
   * delete opportunity api
   */
  deleteOpportunity(oppId: string) {
    return this.api.delete('/portal/opportunity/delete/' + oppId, '');
  }

  /**
   * Apply for an opportunity
   * @param job id
   */
  applyForAnOpportunity(reqBody: any) {
    return this.api.post('/portal/job/apply', reqBody);
  }
  
/**
 * opportunity report
 */
  getReports(type: string){
    return this.api.get('/portal/report/questions/getByType/' + type)
  }

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
