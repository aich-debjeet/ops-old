import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-bio',
  templateUrl: './about-bio.component.html',
  providers: [ModalService],
  styleUrls: ['./about-bio.component.scss']
})
export class AboutBioComponent implements OnInit {
  public bioForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _store: Store<ProfileModal>
  ) {
    this.tagState$ = this._store.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    // this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });

  }

  ngOnInit() {
    this.bioFormIinit()
  }

  openPopup() {
    this._modalService.open('bioEdit');
    this.bioFormUpdate();
  }

  // Form init
  bioFormIinit() {
    this.bioForm = this._fb.group({
      'gender' : ['F' , [Validators.required]],
      'address_one' : '',
      'address_two' : '',
      'city' : '',
      'country' : '',
      'pin_code' : '',
      'height' : '',
      'weight' : '',
      'lang' : '',
      'ethnicity' : '',
      'complexion' : '',
    });
  }

  bioFormUpdate() {
    this.bioForm.setValue({
      gender : this.userProfile.profileDetails['physical'].gender ,
      address_one : this.userProfile.profileDetails['extra']['address'].line1,
      address_two : this.userProfile.profileDetails['extra']['address'].line2,
      city : this.userProfile.profileDetails['extra']['address'].city,
      country : this.userProfile.profileDetails['extra']['address'].country,
      pin_code : this.userProfile.profileDetails['extra']['address'].postalCode,
      height : this.userProfile.profileDetails['physical'].height,
      weight : this.userProfile.profileDetails['physical'].weight,
      lang : '',
      ethnicity : this.userProfile.profileDetails['physical'].ethnicity,
      complexion : this.userProfile.profileDetails['physical'].complexion,
    });
  }

}
