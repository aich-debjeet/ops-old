import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../helpers/form.validator';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { AuthActions } from '../../actions/auth.action';

@Component({
  selector: 'app-invite-people',
  templateUrl: './invite-people.component.html',
  styleUrls: ['./invite-people.component.scss']
})
export class InvitePeopleComponent implements OnInit {
  inviteForm: FormGroup;
  loginState$: Observable<any>;
  private loginSub: ISubscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', Validators.required, EmailValidator.isValid.bind(this)]
    });

    this.loginState$ = this.store.select('loginTags');
    this.loginSub = this.loginState$.subscribe((state) => {
      if (state) {
        console.log('state', state);
      }
    });
  }

  sendInvite(data: any) {
    // console.log('data', data);
    // if (this.inviteForm.valid) {
    //   this.store.dispatch({
    //     type: AuthActions.SEND_INVITATION,
    //     payload: this.inviteForm.controls.email.value
    //   });
    // }
  }

}
