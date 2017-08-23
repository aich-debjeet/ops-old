import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-option',
  templateUrl: './password-option.component.html',
  styleUrls: ['./password-option.component.scss']
})

export class PasswordOptionComponent {
  resetForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router) {
    this.resetForm = fb.group({
      'typePassword': ['mail', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
    });

  }

  submitForm(value) {
    console.log(value);
    if (value.typePassword === 'mail') {
      this.router.navigate(['account/reset_mail_send']);
    } else {
      this.router.navigate(['account/confirm_pin_rest']);
    }
  }

}
