import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, UserTag, initialTag, RightBlockTag } from '../../models/auth.model';

// Action
import { AuthActions } from '../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private tagStateSubscription: Subscription;
  tagState$: Observable<Login>;
  rightCom: RightBlockTag;
  petTag = initialTag;
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private store: Store<Login>, private router: Router) {

    this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': ['', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    // this.tagState$.subscribe(v => console.log(v));

    this.tagState$.subscribe((state) => {
    this.petTag = state;

        console.log(state);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });


  }

  ngOnInit() {
    this.rightCom = {
      mainTitle: 'Log in to your account',
      secondHead: '',
      description: '',
      loginLink: true,
      button_text: 'Sign Up',
      button_link: '/reg',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/ea59992e07375eec923510dbbab1cbd94a16acc2/261fd/img/login_illustration.png'
    };

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.access_token) {
      this.store.dispatch({ type: AuthActions.USER_AUTHENTICATED, payload: ''});
    }
  }

  submitForm(value: any) {

    if ( this.loginForm.valid === true ) {
      const form =  {
        'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
        'client_secret': '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',
        'username' : value.email,
        'password' : value.password,
        'grant_type' : 'password'
      }

      this.store.dispatch({ type: AuthActions.USER_LOGIN, payload: form});
    }
  }


}
