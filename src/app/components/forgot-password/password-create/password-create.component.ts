import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

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

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

    this.createPass = fb.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
      console.log('initial state: ');
      console.log(this.forgotP);
    });
  }

  fpGetUserdata() {
    console.log('req activation code: ' + this.activationCode);
    return this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/resetPasswordToken/' + this.activationCode)
    .map((data: Response) => data.json())
    .subscribe(data => {
      this.forgotP.fp_userdata_resp = data;
      this.forgotP.fp_user_input = data.SUCCESS.username;
      console.log(data);
    },
    // err => console.log(err)
    );
  }

  // get activation code from url
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.activationCode = params.activation_code;
    });
    // send back to forgot page landing directly on this page
    if (!this.forgotP.fp_user_options) {
      // this.router.navigate(['account/password_reset']);
      this.fpGetUserdata();
    }
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
