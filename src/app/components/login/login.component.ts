import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../models/auth.model';

// actions
import { AuthActions } from '../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginState$: Observable<Login>;
  loginState = initialTag;
  loginForm: FormGroup;
  redirectUrl: any;
  queryParam: any;
  imageBaseUrl = environment.API_IMAGE;
  private loginSub: ISubscription;

  constructor(
    fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.loginState$ = store.select('loginTags');
    this.loginSub = this.loginState$.subscribe((state) => {
      this.loginState = state;
    });
  }

  ngOnInit() {
    // if redriect url there
    if (this.route.snapshot.queryParams['next']) {
      this.redirectUrl = this.route.snapshot.queryParams['next'];
    }

    // redrection query param
    if (this.route.snapshot.queryParams) {
      this.queryParam = this.route.snapshot.queryParams;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('calling');
    if (user && user.access_token) {
      // console.log('authentication', user.access_token);
      this.store.dispatch({ type: AuthActions.USER_AUTHENTICATED, payload: ''});
    }
  }


  submitForm(value: any) {
    if (this.loginForm.valid === true) {
      const form =  {
        client_id: 'AKIAI7P3SOTCRBKNR3IA',
        client_secret: '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',
        username: value.email,
        password: value.password,
        grant_type: 'password'
      }
      this.store.dispatch({ type: AuthActions.USER_LOGIN, payload: form});
      // org registration successful
      this.store.select('loginTags')
        .first(login => login['login_success'] === true)
        .subscribe(data => {
          if (this.redirectUrl !== undefined) {
            this.router.navigateByUrl(this.redirectUrl);
            return
          } else {
            this.router.navigateByUrl('/home');
            return
          }
        });
    }
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

}
