import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, userTag, initialTag } from '../../models/login.model';

//Action
import { authActions } from '../../actions/auth.action'

//rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Hero {
  success : boolean 
}

const HEROES: Hero = 
  { success : false  };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tagState$: Observable<Login>;
  private tagStateSubscription: Subscription;
  petTag = initialTag;

	loginForm : FormGroup;
  // value = initialTag;
  // public token: string;

  constructor(fb: FormBuilder, private store: Store<Login>, private router: Router) { 
  	this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required],
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

    console.log(this.petTag);

     var user = JSON.parse(localStorage.getItem('currentUser'));
     if (user && user.access_token) {
       this.router.navigate(['/home']);
     }
      // this.token = currentUser && currentUser.token;
  }

  submitForm(value: any){
    let form = {
      'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
      'client_secret': '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',
      'username' : value.email,
      'password' : value.password,
      'grant_type' : 'password'
    }

    this.store.dispatch({ type: authActions.USER_LOGIN, payload: form});
  	// console.log(value);
  }


}
