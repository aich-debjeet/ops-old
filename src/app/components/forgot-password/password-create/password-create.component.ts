import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
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
  passwordShow = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

    this.createPass = fb.group({
      'password' : ['', [
        Validators.required,
        this.passwordStrength.bind(this)
      ]],
      'confirmpassword' : ['', [
        Validators.required,
        this.passwordMatchCheck.bind(this)
      ]]
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

    if (this.createPass.valid === true) {
      // console.log(value);
      const form = {
        password: value.password,
        activationCode: this.activationCode,
        identity: this.forgotP.fp_user_input
      };

      this.store.dispatch({ type: AuthActions.FP_CREATE_PASS, payload: form });
    }
  }

  /**
   * Checking for the password strength on register form
   * @param control: Form password input
   */
  passwordStrength(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
    // const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    if (!passwordRegex.test(control.value)) {
      // console.log('weak pass: ' + control.value);
      return { isWeakPassword: true };
    }
    return null;
  }

  /**
   * Checking for the password if matches with the confirm password on register form
   * @param control: Form confirm password input
   */
  passwordMatchCheck(control: AbstractControl) {
    // console.log(control.value);
    if (control.value === '') {
      return;
    }
    const pass = this.createPass.controls['password'].value;
    // console.log('pass: ' + pass);
    if (control.value !== pass) {
      return { passwordDoesNotMatch: true };
    }
    return null;
  }

  passwordShowToggle() {
    if (this.passwordShow === true) {
      this.passwordShow = false;
    } else {
      this.passwordShow = true;
    }
  }

}
