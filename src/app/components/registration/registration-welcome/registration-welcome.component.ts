import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { RegValue, RightBlockTag } from '../../../models/auth.model';

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

  rightCom: RightBlockTag;
  constructor() { }

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Welcome',
      secondHead:'Are you a Critic?', 
      description: '',
      loginLink: false,
      button_text: 'Sign Up',
      button_link: '/home'
    };
  }

}
