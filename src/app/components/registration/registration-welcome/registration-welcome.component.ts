import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { RegValue, RightBlockTag, AuthModel } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-registration-welcome',
  templateUrl: './registration-welcome.component.html',
  styleUrls: ['./registration-welcome.component.scss']
})
export class RegistrationWelcomeComponent implements OnInit {
  wForm: FormGroup;
  rightCom: RightBlockTag;
  tagState$: Observable<AuthModel>;
  private tagStateSubscription: Subscription;

  constructor(
    private router: Router,
    fb: FormBuilder,
    private store: Store<AuthModel>
  ) {
    this.tagState$ = store.select('loginTags');
    this.wForm = fb.group({
      'isCritic': false,
    })
  }

  ngOnInit() {
    this.rightCom = {
      mainTitle: 'Welcome',
      secondHead: '',
      description: 'Select specific skill sets that you possess. Can click on as many options as you like there are no restrictions .',
      loginLink: false,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'https://d33wubrfki0l68.cloudfront.net/61f96ccf1172c7d2fa2aa275426486d5463fba68/fd218/img/reg_critic_illustration.png'
    };
  }

  submit(value) {
    const form =  {
      'other': {
        'isCritic' : value.iscritic
      }
    }
    this.store.dispatch({ type: AuthActions.USER_REGISTRATION_WELCOME, payload: form});

    this.tagState$.subscribe(
      data => {
        if (data.success === true) {
          this.router.navigateByUrl('/profile')
        }
      }
    )

  }

}
