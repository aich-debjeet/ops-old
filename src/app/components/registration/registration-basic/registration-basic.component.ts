import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag } from '../../../models/auth.model';

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
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  styleUrls: ['./registration-basic.component.scss']
})
export class RegistrationBasicComponent implements OnInit {
  rightCom: RegValue;
  tagState$: Observable<Register>;
  private tagStateSubscription: Subscription;
  petTag = initialTag;

  public regFormBasic: FormGroup;
  public otpForm: FormGroup;
  public user;
  constructor(fb: FormBuilder, private store: Store<Register>) { 
    // this.regFormBasic = fb.group({
    //   'name' : [null, Validators.required],
    //   'username' : [null, Validators.required],
    //   'dob' : [null, Validators.required],
    //   'email' : [null, Validators.required],
    //   'number' : [null, Validators.required],
    //   'password' : [null, Validators.required],
    //   'confirm_password' : [null, Validators.required],
    //   // 'photo' : [null, Validators.required],
    //   // 'gender' : [null, Validators.required],
    // })

    this.regFormBasic = fb.group({
      'name' : ['name', Validators.required],
      'username' : ['username', Validators.required],
      'dob' : ['', Validators.required],
      'email' : ['name@mail.com', Validators.required],
      'number' : [9898989898, Validators.required],
      'password' : ['pass', Validators.required],
      'confirm_password' : ['pass', Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    })

    this.otpForm = fb.group({
      'otp' : ['otp', Validators.required]
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe(v => console.log(v));

    this.tagState$.subscribe((state) => {
    this.petTag = state;

        console.log(state);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });
  }
  

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Create Your Account', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
      loginLink: true
    };
  }

}
