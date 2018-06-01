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
export class ForgotPasswordComponent implements OnInit {
  forgotPass: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(fb: FormBuilder, private store: Store<Login>, private router: Router, private route: ActivatedRoute) {
    this.forgotPass = fb.group({
      identity: ['', Validators.required]
    });
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: AuthActions.FP_STATE_RESET });
  }

  // submit the identity
  submitForm(value: any) {

    if (value.identity === '') {
      return;
    }

    const form = {
      forgetPasswordtype: 'userCheck',
      value: value.identity.trim()
    }

    this.store.dispatch({ type: AuthActions.FP_USER_EXISTS, payload: form });
  }
}
