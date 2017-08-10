import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { ArtistFollow, initialArtistFollow } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

export class Post {
  title:string;
  content:string;
  img:string;

  // Copy constructor.
  constructor(obj: Object) {
    this.title = obj['title'];
    this.content = obj['content'];
    this.img = obj['img'] || 'test';
  }

  // New static method.
  static fromJSONArray(array: Array<Object>): Post[] {
    return array.map(obj => new Post(obj));
  }
}

@Injectable()
export class AuthService {
    private apiLink: string = environment.API_ENDPOINT; 

    constructor(private http: Http, private router: Router) { }

    login(req: any) { 
        return this.http.post(`${this.apiLink}/portal/auth/oauth2/token`, req)
            .map((response: Response) => {
                const user = response.json();
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.router.navigate(['/home']);
            });
    }

    register(req: any) {
        return this.http.post(`${this.apiLink}/portal/auth/user`, req)
            .map((response: Response) => {
                const user = response.json();
                console.log(user);

                localStorage.setItem('registerUser', JSON.stringify(user));
                this.router.navigate(['/registration/add-skill']);
            });
    }

    registerProfile(req: any) {
        return this.http.post(`${this.apiLink}/portal/auth/user`, req)
            .map((response: Response) => {
                const user = response.json();
                console.log(user);
                localStorage.setItem('registerProfile', JSON.stringify(user));
                this.router.navigate(['/registration/welcome']);
            });
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
        return this.http.get(this.apiLink +'/portal/auth/accounttype/individual')
            .map((data: Response) => data.json());
    }

    userExists(username: string) {
        return this.http.get(this.apiLink +'/portal/auth/'+username+'/username')
            .map((data: Response) => data.json());
    }

    emailUserExists(email: string) {
        console.log(email);
        // return this.http.get(this.apiLink +'/portal/auth/'+email+'/email')
        //     .map((data: Response) => data.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getArtistFollow(value) {
        let headers = new Headers({ 'Content-Type': 'application/json'}); 
        return this.http.put(this.apiLink +'/portal/searchprofiles', JSON.stringify(value), { headers: headers })
            .map((data) => data.json());
    }

    
}
