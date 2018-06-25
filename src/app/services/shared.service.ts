import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class SharedService {

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

  getReport(data: any){
    // console.log(data)
    return this.api.post('/portal/report', data);
  }

}
