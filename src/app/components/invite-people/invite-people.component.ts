import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../helpers/form.validator';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { AuthActions } from '../../actions/auth.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-people',
  templateUrl: './invite-people.component.html',
  styleUrls: ['./invite-people.component.scss']
})
export class InvitePeopleComponent implements OnInit {
  inviteForm: FormGroup;
  loginState$: Observable<any>;
  private loginSub: ISubscription;
  disableSubmit = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.buildForm();

    this.loginState$ = this.store.select('loginTags');
    this.loginSub = this.loginState$.subscribe((state) => {
      if (state) {
        // console.log('state', state);
      }
    });
  }

  buildForm() {
    this.inviteForm = this.fb.group({
      // email: ['', Validators.required, EmailValidator.isValid.bind(this)]
      email: ['', Validators.required]
    });
  }

  sendInvite(data: any) {
    if (this.inviteForm.valid) {
      this.disableSubmit = true;
      const reqBody = {
        listData: [{
          email: this.inviteForm.controls.email.value
        }]
      };
      this.store.dispatch({
        type: AuthActions.SEND_INVITATION,
        payload: reqBody
      });

      this.store.select('loginTags')
        .first(resp => resp['send_invite_success'] === true)
        .subscribe(() => {
          this.disableSubmit = false;
          this.toastr.success('Invitation sent successfully', 'Success!');
          this.buildForm();
          return;
        });
    }
  }

}
