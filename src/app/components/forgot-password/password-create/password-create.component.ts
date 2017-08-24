import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit {

  activationCode: string;

  createPass: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router, private activatedRoute: ActivatedRoute) {

    this.createPass = fb.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
      console.log('initial state: ');
      console.log(this.forgotP);
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        // this.router.navigate(['account/password_reset']);
      }
    });
  }

  // get activation code from url
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.activationCode = params.activation_code;
    });
  }

  submitForm(value: any) {
    // console.log(value);
    const form = {
      password: value.password,
      activationCode: this.activationCode,
      identity: this.forgotP.fp_user_input
    };

    this.store.dispatch({ type: AuthActions.FP_CREATE_PASS, payload: form });
  }

}
