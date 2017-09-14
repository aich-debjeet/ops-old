import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { ArtistFollow, initialArtistFollow } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ApiService } from '../helpers/api.service';

export class Post {
  title: string;
  content: string;
  img: string;

  // Copy constructor.
  constructor(obj: Object) {
    this.title = obj['title'];
    this.content = obj['content'];
    this.img = obj['img'] || 'test';
  }

  // New static method
  static fromJSONArray(array: Array<Object>): Post[] {
    return array.map(obj => new Post(obj));
  }
}

@Injectable()
export class AuthService {
    private apiLink: string = environment.API_ENDPOINT;
    private handle: string;
    private headers: any;
    constructor(
      private http: Http,
      private api: ApiService,
      private router: Router) {
        this.handle = this.api.getHandle();
        this.headers = this.api.getHeaders();
      }

    login(req: any) {
      return this.http.post(`${this.apiLink}/portal/auth/oauth2/token`, req)
        .map((response: Response) => {
          const user = response.json();
          if (user && user.access_token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/profile']);
          }
        });
    }

    validateToken() {
      const req = {};
      return this.http.get(`${this.apiLink}/portal/auth/loggedUser`, { headers: this.headers })
      .map((response: Response) => {
          const user = response.json();
          if (user.profileId) {
            console.log(user.profileId);
          }
          localStorage.setItem('currentUserID', user.profileId);
          this.router.navigate(['/profile']);
      });
    }

    registerStepBasic(req: any) {
      return this.api.post('/portal/auth/user', req);
    }

    registerProfile(req: any) {
      return this.api.put('/portal/auth/user/update', JSON.stringify(req) );
    }

    registerWelcome(req: any) {
      return this.api.put('/portal/auth/user/update', JSON.stringify(req));
    }

    artistFollowing(req: any) {
      return this.api.put('/portal/network/following/start', JSON.stringify(req));
    }

    checkOtp(req: any) {
      return this.http.post(`${this.apiLink}/portal/otp-check`, req)
        .map((response: Response) => {
            const result = response.json();
            localStorage.setItem('otpStatus', JSON.stringify(result));
            this.router.navigate(['/registration/select-profile']);
        });
    }

    loadArtistType() {
      return this.api.get('/portal/auth/accounttype/individual/', '');
    }

    /**
     * Check if User Exists
     * @param reqData
     */

    fpUserExists(reqData: any) {
      return this.api.post('/portal/auth/forgotPassword/post', reqData);
    }

    userExists(username: string) {
      const path = '/portal/auth/' + username + '/username';
      return this.api.get(path, '');
    }

    emailUser(email: string) {
      const path = '/portal/auth/' + email + '/email';
      return this.api.get(path, '');
    }

    mobilelUser(number: string) {
      const path = '/portal/auth/' + number + '/contact';
      return this.api.get(path, '');
    }
    /**
     * Add a new Skill
     * @param skillObj  New Skilll Name
     */
    saveSkill(skillObj) {
      // Object
      const skill = {
        'name': skillObj,
        'code': skillObj.toUpperCase(),
        'industry' : [
          {
            'name' : 'Uncategorized',
            'code' : 'UNCATEGORIZED',
            'isApproved' : true,
            'active' : true
          }
        ],
        'proficiencyScale' : 101.0,
        'industryOrProfileType' : 'profileType',
        'isApproved' : true,
        'active' : true
      }

      return this.api.post('/admin/profiletype', skill );
    }

    /**
     * Store user handle
     */
    setUserHandle(handle: string) {
      // remove user from local storage to log user out
      localStorage.setItem('currentUserID', handle);
    }

    /**
     * Go to user profile page
     */
    goToProfile() {
      console.log('going to profile');
      this.router.navigateByUrl('/profile');
    }
    /**
     * Add a save Skills
     * @param skills array all skills
     */
    saveSelectedSkills(skillsArr) {

      console.log(this.headers);
        // Object
        const skills = { profileTypeList: skillsArr }
        return this.http.put(this.apiLink + '/portal/profile/updateProfile', skills, { headers: this.headers })
          .map((data: Response) => data.json());
      }

    getAllIndustries() {
      return this.api.get('/portal/industry', '');
    }

    searchAllSkill(query: string) {
      return this.api.get('/portal/tree/' + query + '/0/100');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getArtistFollow(value) {
      return this.http.put(this.apiLink + '/portal/searchprofiles/Industry', value, { headers: this.headers })
          .map((data) => data.json());
    }

    fpResetTypePhone(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    fpResetTypeEmail(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    fpSubmitOtp(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    fpCreatePass(req: any) {
        // console.log('req body');
        // console.log(req);
        const reqBody = {
            password: req.password,
            token: req.activationCode
        }
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.put(`${this.apiLink}/portal/auth/user/change/` + req.identity, reqBody, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    // Get data forget user
    fpGetUserdata(activationCode) {
      const headers = new Headers({ 'Content-Type': 'application/json'});
      return this.http.get(`${this.apiLink}/portal/auth/resetPasswordToken/` + activationCode, { headers: this.headers })
      .map((data: Response) => data.json());
    }
}
