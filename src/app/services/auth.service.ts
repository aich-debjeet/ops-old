import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    constructor(private http: Http, private router: Router) { }

    login(req: any) {
        return this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/oauth2/token', req)
            .map((response: Response) => {
                const user = response.json();
                console.log(user);
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.router.navigate(['/home']);
            });
    }

    registerProfile(req: any) {
        return this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/user', req)
            .map((response: Response) => {
                const user = response.json();
                console.log(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.router.navigate(['/home']);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
