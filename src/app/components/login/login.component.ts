import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Login } from '../../models/login.model';

//Action
import { LoginActions } from '../../actions/login.action'

//rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tagState$: Observable<Login>;
  private tagStateSubscription: Subscription;
  petTag: Login;

	loginForm : FormGroup;

  constructor(fb: FormBuilder, private store: Store<Login>) { 
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
  }

  submitForm(value: any){
    let form = {
      'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
      'client_secret': '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',
      'username' : value.email,
      'password' : value.password,
      'grant_type' : 'password'
    }

    this.store.dispatch({ type: LoginActions.USER_LOGIN, payload: form});
  	// console.log(value);
  }


}
