import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag, authModel } from '../../../models/auth.model';


// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
  button_text: string;
  button_link: string;
}


@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.scss'],
})
export class RegistrationProfileComponent implements OnInit {

  rForm: FormGroup;
  rightCom: RegValue;

  tagState$: Observable<authModel>;
  private tagStateSubscription: Subscription;
  artistType = initialTag;
  
  constructor(fb: FormBuilder, private store: Store<authModel>) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
        this.artistType = state;

         console.log(state);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });

    this.rForm = fb.group({
      'artistList' : fb.array([]),
      'is_student': [false, Validators.required],
    })
  }
  ngOnInit() { 
    this.store.dispatch({ type: AuthActions.LOAD_ARTIST});
    this.rightCom = { 
      mainTitle: 'Select your profile type', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      loginLink: true,
      button_text: 'Sign Up',
      button_link: '/home'
    };
  }

  addPost(value: any) {
      console.log(value);
      // this.store.dispatch({ type: AuthActions.USER_REGISTER_PROFILE, payload: value});
  }

  onChange(value:string, type:string, isChecked: boolean) {
    const checkboxFormArray = <FormArray>this.rForm.controls.artistList;

    if(isChecked) {
      checkboxFormArray.push(new FormControl({name: value, typeName: type}));
    } else {
      let index = checkboxFormArray.controls.findIndex(x => x.value == value)
      checkboxFormArray.removeAt(index);
    }
  }

}
