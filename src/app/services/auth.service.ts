import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { ArtistFollow, initialArtistFollow } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

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

    constructor(private http: Http, private router: Router) { }
    /**
     * Get Token from LocalStorage
     */
    getToken() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.access_token; // your token
      return token;
    }

    /**
     * Build Autherization Header based on token
     */
    getAuthHeader() {
      const token = this.getToken();
      const headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + token);
      return headers;
    }

    login(req: any) {
        return this.http.post(`${this.apiLink}/portal/auth/oauth2/token`, req)
            .map((response: Response) => {
                const user = response.json();
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.router.navigate(['/profile']);
            });
    }

    registerStepBasic(req: any) {
        return this.http.post(`${this.apiLink}/portal/auth/user`, req)
            .map((data: Response) => data.json());
            // .map((response: Response) => {
            //     const user = response.json();
            //     // console.log(user);

            //     // localStorage.setItem('registerUser', JSON.stringify(user));
            //     // this.router.navigate(['/registration/add-skill']);
            // });
    }

    registerProfile(req: any) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser.access_token; // your token

        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + token)

        return this.http.put(this.apiLink + '/portal/auth/user/update', JSON.stringify(req), { headers: headers })
            .map((data) => data.json());
        // return this.http.post(`${this.apiLink}/portal/auth/user`, req)
        //     .map((data: Response) => data.json());
            // .map((response: Response) => {
            //     const user = response.json();
            //     console.log(user);
            //     localStorage.setItem('registerProfile', JSON.stringify(user));
            //     this.router.navigate(['/registration/welcome']);
            // });
    }

    registerWelcome(req: any) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.access_token; // your token

        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + token)

        return this.http.put(this.apiLink + '/portal/auth/user/update', JSON.stringify(req), { headers: headers })
            .map((data) => data.json());

    }

    artistFollowing(req: any) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.access_token; // your token

        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + token)

        return this.http.put(this.apiLink + '/portal/network/following/start', JSON.stringify(req), { headers: headers })
            .map((data) => data.json());
    }

    checkOtp(req: any) {
        return this.http.post(`${this.apiLink}/portal/otp-check`, req)
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                localStorage.setItem('otpStatus', JSON.stringify(result));
                this.router.navigate(['/registration/select-profile']);
            });
    }

    loadArtistType() {
        return this.http.get(this.apiLink + '/portal/auth/accounttype/individual')
            .map((data: Response) => data.json());
    }

    userExists(username: string) {
        return this.http.get(this.apiLink + '/portal/auth/' + username + '/username')
            .map((data: Response) => data.json());
    }

    /**
     * Check if User Exists
     * @param reqData
     */

    fpUserExists(reqData: any) {
      return this.http.post(this.apiLink + '/portal/auth/forgotPassword/post', reqData)
          .map((data: Response) => data.json());
    }

    emailUser(email: string) {
        return this.http.get(this.apiLink + '/portal/auth/' + email + '/email')
            .map((data: Response) => data.json());
    }

    mobilelUser(number: string) {
        return this.http.get(this.apiLink + '/portal/auth/' + number + '/contact')
            .map((data: Response) => data.json());
    }
    /**
     * Add a new Skill
     * @param skillObj  New Skilll Name
     */
    saveSkill(skillObj) {
      // Headers
      const token = this.getToken();
      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + token);

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

      return this.http.post(this.apiLink + '/admin/profiletype', skill, { headers: headers })
        .map((data: Response) => data.json());
    }

    getAllSkill() {
      console.log('loading all the skills');
      return this.http.get(this.apiLink + '/portal/industry')
        .map((data: Response) => data.json());
    }

    searchAllSkill(q: string) {
      return this.http.get(this.apiLink + '/portal/tree/' + q)
        .map((data: Response) => data.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getArtistFollow(value) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.access_token; // your token

        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + token);

        return this.http.put(this.apiLink + '/portal/searchprofiles/Industry', value, { headers: headers })
            .map((data) => data.json());
    }

    fpResetTypePhone(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: headers })
        .map((data: Response) => data.json());
    }

    fpResetTypeEmail(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: headers })
        .map((data: Response) => data.json());
    }

    fpSubmitOtp(req: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: headers })
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
        return this.http.put(`${this.apiLink}/portal/auth/user/change/` + req.identity, reqBody, { headers: headers })
        .map((data: Response) => data.json());
    }
}
