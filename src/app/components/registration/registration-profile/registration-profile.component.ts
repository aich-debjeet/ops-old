import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag } from '../../../models/auth.model';


// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.scss'],
})
export class RegistrationProfileComponent implements OnInit {

  rForm: FormGroup;
  rightCom: RightBlockTag;

  tagState$: Observable<AuthModel>;
  private tagStateSubscription: Subscription;
  artistType = initialTag;

  constructor(fb: FormBuilder, private store: Store<AuthModel>, private router: Router) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
        this.artistType = state;

        //  console.log(state);
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
      mainTitle: 'Select Your Profile Type',
      secondHead: '',
      description: 'Select specific skill sets that you possess. You can click on as many options as you like.',
      loginLink: false,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/8116a57b8fb73beafbe44c518c398f1cc01d79d1/24877/img/registration_acc_type_illustration.png'
    };
  }

  addPost(value: any) {
      console.log(value);
      const form =  {
        "other":{
          "completionStatus" : 2,
          "accountType" : value.artistList,
          "isStudent":value.is_student
        }
      }
      localStorage.setItem('userType', JSON.stringify(value.artistList));
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_PROFILE, payload: form});

      this.tagState$.subscribe(
      data => {
        console.log(data.success);
        if(data.success == true){ this.router.navigateByUrl("/reg/addskill") }
      }
    )
  }

  onChange(value: string, type: string, isChecked: boolean) {
    console.log('on change');
    const checkboxFormArray = <FormArray>this.rForm.controls.artistList;

    if (isChecked) {
      checkboxFormArray.push(new FormControl({name: value, typeName: type}));
    } else {
      let index = checkboxFormArray.controls.findIndex(x => x.value == value)
      checkboxFormArray.removeAt(index);
    }

  }
}
