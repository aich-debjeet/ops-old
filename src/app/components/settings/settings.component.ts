import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormValidation, ProfileUpdateValidator } from '../../helpers/form.validator';

// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ModalService, ProfileUpdateValidator],
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  pwdForm: FormGroup;
  private usernameForm: FormGroup;
  emailActive: boolean;
  phoneActive: boolean;
  userActive: boolean;
  selectedView: string;

  constructor(
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private profileUpdateValidator: ProfileUpdateValidator,
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');

     this.storeState$.subscribe((state) => {
      this.userProfile = state['profileDetails'];
    });

    // Username update form init
    this.usernameForm = this._fb.group({
      'username' : ['' , [Validators.required, Validators.minLength(4), FormValidation.noWhitespaceValidator], this.profileUpdateValidator.userNameValidation.bind(this.profileUpdateValidator)],
    });

    this.passwordformInit();

    this.emailActive = false;
    this.phoneActive = false;
   }

  ngOnInit() {
    this.selectedView = 'account';
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
  }

  /**
   * User Form Update
   */
  userFormUpdate(value) {
    console.log(this.usernameForm.valid);
    console.log(value);
    if ( this.usernameForm.valid === true ) {
      const form =  {
        'username': value.username.toLowerCase()
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
    }
  }

  /**
   * Password form submit
   */
  submitForm(value) {
    console.log(value);
    if (this.pwdForm.valid === true) {
      const body = {
        'currentPassword': value.currentpassword,
        'newPassword': value.newpassword
      }
      this._store.dispatch({ type: ProfileActions.USER_PASSWORD_UPDATE, payload: body });
      this.passwordformInit();
    }
  }


  /**
   * Password Form init
   */
  passwordformInit() {
    this.pwdForm = this._fb.group({
      'currentpassword' : ['' , [Validators.required]],
      'newpassword' : ['' , [Validators.required, FormValidation.passwordStrength.bind(this)]],
      'confirmpassword' : ['' , [
        Validators.required,
        this.passwordMatchCheck.bind(this)
        ]
      ]
    });
  }

  /**
   * send OTP Form
   */
  sendOtp() {
    this._modalService.open('otpValidatePopup');
  }

  /**
   * toggle of email
   */
  emailToggle() {
    if (this.emailActive === true) {
      this.emailActive = false;
    }else {
      this.emailActive = true;
    }
  }

  /**
   * toggle of phone
   */
  phoneToggle() {
    if (this.phoneActive === true) {
      this.phoneActive = false;
    }else {
      this.phoneActive = true;
    }
  }

  /**
   * toggle of user
   */
  userToggle() {
    if (this.userActive === true) {
      this.userActive = false;
    }else {
      this.userActive = true;
    }

    this.usernameForm.setValue({
      username: this.userProfile['extra'].username,
    });
  }

  /**
   * Checking for the password if matches with the confirm password on register form
   * @param control: Form confirm password input
   */
  passwordMatchCheck(control: AbstractControl) {
    // console.log(control.value);
    if (control.value === '') {
      return;
    }
    const pass = this.pwdForm.controls['newpassword'].value;
    // console.log('pass: ' + pass);
    if (control.value !== pass) {
      return { passwordDoesNotMatch: true };
    }
    return null;
  }

  displayView(tab: string) {
    if (tab === 'account') {
     this.selectedView = 'account';
    }
    if (tab === 'preference') {
     this.selectedView = 'preference';
    }
    if (tab === 'email') {
     this.selectedView = 'email';
    }
    if (tab === 'nsfw') {
     this.selectedView = 'nsfw';
    }
  }

}
