import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-sms',
  templateUrl: './password-sms.component.html',
  styleUrls: ['./password-sms.component.scss']
})
export class PasswordSmsComponent {

  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
    });
  }

}
