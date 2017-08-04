import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Login, UserTag, initialTag, RegisterProfile } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
}


@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.scss'],
})
export class RegistrationProfileComponent implements OnInit {

  rForm: FormGroup;
  rightCom: RegValue;

  constructor(fb: FormBuilder, private store: Store<RegisterProfile>) {
    this.rForm = fb.group({
      'artCheckbox1' : [null],
      'artCheckbox2' : [null],
      'artCheckbox3' : [null],
      'study': [null, Validators.required],
    })
  }
ngOnInit() {
  this.rightCom = {
    mainTitle: 'Select your profile type',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
    + ' sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet,'
    + ' consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
    loginLink: true
  };
}

  addPost(value: any) {
      console.log(value);
      this.store.dispatch({ type: AuthActions.USER_REGISTER_PROFILE, payload: value});
  }

}
