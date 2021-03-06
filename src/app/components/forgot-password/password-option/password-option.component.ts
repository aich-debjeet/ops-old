import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-option',
  templateUrl: './password-option.component.html',
  styleUrls: ['./password-option.component.scss']
})

export class PasswordOptionComponent implements OnDestroy {
  resetForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;

  private subscription: ISubscription;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router) {
    this.resetForm = fb.group({
      typePassword: ['mail', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.subscription = this.tagState$.subscribe((state) => {
      this.forgotP = state;
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        this.router.navigate(['account/password_reset']);
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // submit the recovery option
  submitForm(value: any) {

    const form = {
      forgetPasswordtype: '',
      value: '',
      cType: 'phone'
    }

    // check for the recovery type
    if (value.typePassword === 'mobile') {
      // preparing req params
      form.forgetPasswordtype = 'forgetPasswordLink';
      form.cType = 'phone';
      form.value = this.forgotP.fp_user_input;

      this.store.dispatch({ type: AuthActions.FP_RESET_TYPE_PHONE, payload: form });

    } else if (value.typePassword === 'mail') {
      // preparing req params
      form.forgetPasswordtype = 'forgetPasswordLink';
      form.cType = 'email';
      form.value = this.forgotP.fp_user_input;

      this.store.dispatch({ type: AuthActions.FP_RESET_TYPE_EMAIL, payload: form });
    }

  }

}
