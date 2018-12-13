import { Injectable } from '@angular/core';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class SharedService {

  constructor(
    private api: ApiService
  ) { }

  postReport(data: any) {
    return this.api.post('/portal/report', data);
  }

  getReportOptions(type: string) {
    return this.api.get('/portal/report/questions/getByType/' + type);
  }

}
