import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag } from '../../../models/auth.model';
import { AuthRightBlockComponent } from '../../../shared/auth-right-block/auth-right-block.component';

// helper
import { passwordConfirmation } from '../../../helpers/password.validator';
import { formValidation } from '../../../helpers/formValidator';

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
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  styleUrls: ['./registration-basic.component.scss']
})
export class RegistrationBasicComponent implements OnInit {
  rightCom: RegValue;
  tagState$: Observable<Register>;
  private tagStateSubscription: Subscription;
  petTag = initialTag;

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  // public otpForm: FormGroup;
  // public user;
  constructor(private fb: FormBuilder, private store: Store<Register>) { 

    
    // this.otpForm = fb.group({
    //   'otp' : ['otp', Validators.required]
    // })

    this.tagState$ = store.select('loginTags');
    // this.tagState$.subscribe(v => console.log(v));

    this.tagState$.subscribe((state) => {
        this.petTag = state;

        // console.log(state);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });
  }


  ngOnInit() {

    

    this.buildForm();

    // this.rightCom = { 
    //   mainTitle: 'Create Your Account', 
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
    //   loginLink: true
    // };

    this.rightCom = { 
      mainTitle: 'Select your profile type', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      ' sed do eiusmod long-and vitality, so that the labor expended.' +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
      loginLink: true,
      button_text: 'Sign Up',
      button_link: '/home'
    };

    
  }

  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['',[Validators.required,formValidation.NoWhitespaceValidator]],
      'dob' : ['', Validators.required],
      'email' : ['name@mail.com', [ 
        Validators.required, 
        Validators.email
        ]
      ],
      'gender': ['M', Validators.required],
      'phone' : [9898989898, [
        Validators.required, 
        Validators.maxLength(10), 
        Validators.minLength(10)
        ]
      ],
       'password' : ['', Validators.required],
      'confirmpassword' : ['', Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    },{
      validator: formValidation.MatchPassword
    })
    
  }

  // Exisit User check
  userExisitCheck(value){
    if(value.length >= 4){
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    }
    else{
      this.petTag.user_unique = false;
    }
  }

  submitForm(value){
    if(this.regFormBasic.valid == true){
      console.log(value);
      
    }   
  }

}
