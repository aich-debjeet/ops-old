import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { AuthActions } from '../../actions/auth.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-people',
  templateUrl: './invite-people.component.html',
  styleUrls: ['./invite-people.component.scss']
})
export class InvitePeopleComponent implements OnInit, OnDestroy {
  inviteForm: FormGroup;
  loginState$: Observable<any>;
  private loginSub: ISubscription;
  disableSubmit = false;

  public emailValidator = [this.validateEmail];
  public emailValidatorErrorMsgs = {
    isInvalidEmail: 'Email id is not valid'
  };

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

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  buildForm() {
    this.inviteForm = this.fb.group({
      emailIds: ['']
    });
  }

  sendInvite() {
    if (this.inviteForm.valid) {
      this.disableSubmit = true;
      const emailIds = this.inviteForm.controls.emailIds.value;
      const reqBody = {
        listData: []
      };
      for (let i = 0; i < emailIds.length; i++) {
        const singleEmail = { email: emailIds[i].value }
        reqBody.listData.push(singleEmail);
        if (i >= (emailIds.length - 1)) {
          this.store.dispatch({
            type: AuthActions.SEND_INVITATION,
            payload: reqBody
          });
          this.store.select('loginTags')
            .first(resp => resp['send_invite_success'] === true)
            .subscribe(() => {
              this.disableSubmit = false;
              this.toastr.success('Invitation sent successfully', 'Success!', {
                timeOut: 3000
              });
              this.buildForm();
              return;
            });
        }
      }
    }
  }

  private validateEmail(control: FormControl) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(control.value)) {
      return { isInvalidEmail: true };
    }
    return null;
  }

}
