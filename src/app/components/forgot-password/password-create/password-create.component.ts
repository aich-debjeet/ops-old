import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// helper
import { FormValidation } from '../../../helpers/form.validator';

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
  baseUrl: string;
  createPass: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;
  passwordShow = false;
  showLogin = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http
    ) {
    this.baseUrl = environment.API_IMAGE;

    this.createPass = fb.group({
      password : ['', [
        Validators.required,
        FormValidation.passwordStrength.bind(this)
      ]],
      confirmpassword: ['', [
        Validators.required,
        this.passwordMatchCheck.bind(this)
      ]]
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
    });
  }


  ngOnInit() {
    this.activationCode = this.activatedRoute.snapshot.queryParams['activation_code'];
    if (this.activationCode !== '') {
      this.store.dispatch({ type: AuthActions.FP_GET_USER_EMAIL, payload: this.activationCode });
    }
  }

  submitForm(value: any) {
    if (this.createPass.valid === true) {
      const form = {
        password: value.password,
        activationCode: this.activationCode,
        identity: this.forgotP.fp_user_input
      };
      this.store.dispatch({ type: AuthActions.FP_CREATE_PASS, payload: form });
      this.store.select('loginTags')
      .first(resp => resp['fp_create_success'] === true)
      .subscribe(data => {
        this.showLogin = true;
      });
    }
  }

  /**
   * Checking for the password if matches with the confirm password on register form
   * @param control: Form confirm password input
   */
  passwordMatchCheck(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    const pass = this.createPass.controls['password'].value;
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
