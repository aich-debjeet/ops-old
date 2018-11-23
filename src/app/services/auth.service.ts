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

    updateAuthHeaders() {
      this.handle = this.api.getHandle();
      this.headers = this.api.getHeaders();
    }

    verifyRefCode(reqBody: any) {
      return this.api.post('/portal/auth/validate/invitation', reqBody);
    }

    sendInvitation(reqBody: any) {
      return this.api.post('/portal/auth/inviteByEmail', reqBody);
    }

    /**
     * search skill for signup step 2
     */
    signupSkillSearch(reqBody: any) {
      return this.api.post('/portal/skills/search', reqBody);
    }

    /**
     * Set temp access token for not logged in user
     */
    getTempAuthHeaders() {
      let accessToken = '';
      const tempToken = JSON.parse(localStorage.getItem('tempAccessToken'));
      if (tempToken && tempToken.access_token) {
        accessToken = tempToken.access_token;
      }
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.access_token) {
        accessToken = user.access_token;
      }
      const headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + accessToken);
      return headers;
    }

    login(req: any) {
      return this.http.post(`${this.apiLink}/portal/auth/oauth2/token`, req)
        .map((response: Response) => {
          const user = response.json();
          if (user && user.access_token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.updateAuthHeaders();
              // this.router.navigate(['/org/page']);
          }
        });
    }

    validateToken() {
      const req = {};
      this.updateAuthHeaders();
      return this.http.get(`${this.apiLink}/portal/auth/loggedUser`, { headers: this.headers })
      .map((response: Response) => {
        const user = response.json();
        if (user.profileId) {}
        localStorage.setItem('currentUserID', user.profileId);
        this.router.navigate(['/profile']);
      });
    }

    registerStepBasic(req: any) {
      return this.api.post('/portal/auth/user', req);
    }

    /**
     * Search user bu user id
     */
    searchUserWithUsername(username: string) {
      return this.api.get('/portal/auth/user/username/' + username);
    }

    /**
     * claiming user porfile
     */
    claimUserProfile(reqBody: any) {
      return this.api.put('/portal/auth/user/update/handle/' + reqBody.handle, JSON.stringify(reqBody));
    }

    /**
     * claiming user porfile
     */
    claimProfile(reqBody: any) {
      return this.api.post('/portal/auth/user/claim', reqBody);
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

    claimCheckOtp(req: any) {
      return this.http.post(`${this.apiLink}/portal/auth/user/claim/validate`, req)
        .map((response: Response) => {
            const data = response.json();
            if (data && data['access_Token']) {
              const currentUser = { access_token: data['access_Token'] }
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
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
      return this.api.get('/portal/auth/' + username + '/username');
    }

    emailUser(email: string) {
      return this.api.get('/portal/auth/' + email + '/email');
    }

    mobileNumberCheck(contactNumber: object) {
      return this.api.post('/portal/auth/validate/contact', contactNumber);
    }
    /**
     * Add a new Skill
     * @param skillObj  New Skilll Name
     */
    saveSkill(skillObj) {
      // Object
      const skill = {
        name: skillObj,
        code: skillObj.replace(/ /g, '_').toUpperCase(),
        industry: [{
            name: 'Uncategorized',
            code: 'UNCATEGORIZED',
            isApproved: true,
            active: true
        }],
        proficiencyScale: 101.0,
        industryOrProfileType: 'profileType',
        isApproved: false,
        active: true
      }
      return this.api.post('/admin/profiletype', skill);
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
      this.router.navigateByUrl('/profile');
    }
    /**
     * Add a save Skills
     * @param skills array all skills
     */
    saveSelectedSkills(skillsArr) {
      const skills = { profileTypeList: skillsArr }
      return this.api.put('/portal/profile/updateProfile', skills );
    }

    getAllIndustries() {
      return this.api.post('/portal/industry', { limit: 200 });
    }

    searchAllSkill(query: string) {
      return this.api.post('/portal/skills/search', { searchString: query, limit: 30 });
    }

    logout(value) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

    getArtistFollow(value) {
      return this.api.put('/portal/searchprofiles/Industry', value );
    }

    fpResetTypePhone(req: any) {
      this.updateAuthHeaders();
      return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    fpResetTypeEmail(req: any) {
      this.updateAuthHeaders();
      return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    fpSubmitOtp(req: any) {
      this.updateAuthHeaders();
      return this.http.post(`${this.apiLink}/portal/auth/forgotPassword/post`, req, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    regSubmitOtp(reqBody: any) {
      return this.http.post(this.apiLink + '/portal/activate/profile', reqBody)
        .map((response: Response) => {
          const data = response.json();
          if (data && data['access_Token']) {
            const currentUser = { access_token: data['access_Token'] }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.removeItem('tempAccessToken');
          }
        });
    }

    otpLogin(value: any) {
      return this.http.post(this.apiLink + '/portal/auth/login/profile', value )
        .map((response: Response) => {
          const user = response.json();
          if (user && user.access_token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
        });
    }

    otpResend(reqBody: any) {
      return this.http.post(this.apiLink + '/portal/auth/resendotp', reqBody);
    }
    /**
     * 
     * @param reqBody contact details to resend otp
     */
    settOtpResend(reqBody: any){
      console.log('reqBody',reqBody)
      const head = this.getTempAuthHeaders();
      return this.http.put(this.apiLink + '/portal/auth/resend/updateContactNumber', reqBody, { headers: head });
    }

    otpChangeNumber(contactDetails: any) {
      const head = this.getTempAuthHeaders();
      return this.http.put(this.apiLink + '/portal/auth/user/update', contactDetails, { headers: head });
    }

    settingOtpNumberChange(contactDetails: any){
      console.log(contactDetails)
      const head = this.getTempAuthHeaders();
      return this.http.put(this.apiLink + '/portal/auth/update/contact', contactDetails, { headers: head })
      .map((data: Response) => data.json());
    }

    fpCreatePass(req: any) {
        const reqBody = {
            password: req.password,
            token: req.activationCode
        }
        this.updateAuthHeaders();
        return this.http.put(`${this.apiLink}/portal/auth/user/change/` + req.identity, reqBody, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    // Get data forget user
    fpGetUserdata(activationCode) {
      this.updateAuthHeaders();
      return this.http.get(`${this.apiLink}/portal/auth/resetPasswordToken/` + activationCode, { headers: this.headers })
      .map((data: Response) => data.json());
    }

    /**
     * OTP Resend forget user
     * @param value
     */
    forgetOtp(value: any) {
        this.updateAuthHeaders();
        return this.http.post(`${this.apiLink}/portal/auth/forgotPasswordresendotp/validateString`, value, { headers: this.headers })
        .map((data: Response) => data.json());
    }

    isLoggedIn() {
      this.updateAuthHeaders();
      return this.http.get(`${this.apiLink}/portal/auth/loggedUser`, { headers: this.headers });
    }

    danceIndustry() {
      this.updateAuthHeaders();
      return this.http.get(`${this.apiLink}/portal/industry?industryType=dwc`, { headers: this.headers });
    }

    // contact us email send
    sendContact(reqData: any) {
      return this.api.post('/portal/contactus', reqData);
    }
}
