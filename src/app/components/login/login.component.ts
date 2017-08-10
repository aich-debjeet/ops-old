import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, UserTag, initialTag } from '../../models/auth.model';

// Action
import { AuthActions } from '../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
  button_text: string;
  button_link: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private tagStateSubscription: Subscription;
  tagState$: Observable<Login>;
  rightCom: RegValue;
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

    //
    this.rightCom = { 
      mainTitle: 'Select your profile type', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      loginLink: true,
      button_text: 'Sign Up',
      button_link: '/home'
    };

    console.log(this.petTag);

     const user = JSON.parse(localStorage.getItem('currentUser'));
     if (user && user.access_token) {
       this.router.navigate(['/home']);
     }
  }

  submitForm(value: any) {

    if(this.loginForm.valid == true){
      console.log(value);
      const form =  {
        'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
        'client_secret': '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',
        'username' : value.email,
        'password' : value.password,
        'grant_type' : 'password'
      }

      this.store.dispatch({ type: AuthActions.USER_LOGIN, payload: form});
      // console.log(value);
    }
  }


}
