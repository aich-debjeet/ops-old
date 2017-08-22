import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

// Action
import { AuthActions } from '../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../models/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPass: FormGroup;
  tagState$: Observable<Login>;
  petTag = initialTag;

  constructor(fb: FormBuilder, private store: Store<Login>, private router: Router, private route: ActivatedRoute) {
    console.log('ForgotPasswordModule');
    this.forgotPass = fb.group({
      identity: ['', Validators.required]
    });
    this.tagState$ = store.select('loginTags');
    // this.tagState$.subscribe(v => console.log(v));
    this.tagState$.subscribe((state) => {
      this.petTag = state;
      console.log(state);
    });
  }
  submitForm(value: any) {
    console.log(value);
    if (this.forgotPass.valid === true) {
      console.log(value);
      const form = {
        'forgetPasswordtype': 'userCheck',
        'value': value.identity
      }
      this.store.dispatch({ type: AuthActions.FP_USER_EXISTS_CHECK, payload: form});
      // console.log(value);
    }
  }

}
