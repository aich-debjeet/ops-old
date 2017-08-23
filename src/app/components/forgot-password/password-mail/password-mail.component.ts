import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

@Component({
  selector: 'app-password-mail',
  templateUrl: './password-mail.component.html',
  styleUrls: ['./password-mail.component.scss']
})

export class PasswordMailComponent {
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
    });

  }
}
