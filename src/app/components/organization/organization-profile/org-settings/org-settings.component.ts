import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../../models/profile.model';
import { Organization, initialOrganization } from '../../../../models/organization.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormValidation, ProfileUpdateValidator } from '../../../../helpers/form.validator';
import { environment } from '../../../../../environments/environment';
import { TokenService } from './../../../../helpers/token.service';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-org-settings',
  templateUrl: './org-settings.component.html',
  styleUrls: ['./org-settings.component.scss']
})
export class OrgSettingsComponent implements OnInit {
  selectedView: boolean;
  tagState$: Observable<ProfileModal>;
  orgStates$: Observable<Organization>;
  orgProfile = initialOrganization;
  userProfile = initialTag ;
  organizationHandle: string;
  show = false;
  show1 = false;
  adminNameForm: FormGroup;
  receipientList: any;
  recipientsListState: boolean;
  baseUrl: string;
  admin: any;
  memberHandle: string;
  private apiLink: string = environment.API_ENDPOINT;
  existingMembers: any = [];
  membersLoading: boolean;
  selectedOption = [];
  followOption = {name: 'Follow', value: 'Follow', checked: true};
  donationOption = {name: 'Donation', value: 'Donation', checked: true};
  networkOption = {name: 'Network', value: 'Network', checked: true};
  messageOption = {name: 'Message', value: 'Message', checked: true};
  defaultSettings: any;

  constructor(
    private http: Http,
    private store: Store<any>,
    private toastr: ToastrService,
    private _fb: FormBuilder,
    private tokenService: TokenService,
  ) {
    this.adminNameForm = this._fb.group({
      'adminName' : ['' , [Validators.required]],
      'publicWork': true
    });

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      console.log(this.userProfile)
      if (state.profileUser.isOrganization === true) {
        this.organizationHandle = state.profileUser.organization.organizationHandle;
        this.store.dispatch({type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE, payload: this.organizationHandle});
      }
    });

    this.orgStates$ = this.store.select('organizationTags')
    this.orgStates$.subscribe((state) => {
      this.orgProfile = state;
      console.log(this.orgProfile)
      if (state && state.receipients) {
        this.receipientList = state.receipients;
      }
      if (state.organizationMembers) {
        this.existingMembers = this.orgProfile.organizationMembers;
        this.membersLoading = true;
      }
      if (state.defaultSettings) {
        this.defaultSettings = state.defaultSettings;
        this.followOption.checked = this.defaultSettings.follow;
        this.donationOption.checked = this.defaultSettings.donation;
        this.networkOption.checked = this.defaultSettings.network;
        this.messageOption.checked = this.defaultSettings.message;
      }
      if (state.org_deletion_success) {
        console.log('success')
        this.toastr.success('Organization deletion Success');
      }
      if (state.org_deletion_failed) {
        console.log('failed')
        this.toastr.success('Organization deletion failed');
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.selectedView = true;
    this.show = false;
    this.show1 = false;
    this.recipientsListState = false;
    this.baseUrl = environment.API_IMAGE;
    this.membersLoading = false;
  }

  toggleView(tab: String) {
    console.log(this.selectedView)
    if (tab === 'general') {
      console.log('true')
      this.selectedView = true;
    }
    if (tab === 'admin') {
      console.log('false')
      this.store.dispatch({type: OrganizationActions.GET_MEMBERS, payload: this.organizationHandle});
      this.selectedView = false;
    }
  }
  display() {
    if (!this.show) {
      this.show = true;
    }
  }

  display1() {
    if (!this.show1) {
      this.show1 = true;
    }
  }
  adminUpdate(value) {
    console.log(this.adminNameForm.valid);
    console.log(value);
    if ( this.adminNameForm.valid === true ) {
      console.log('valid')
      const form =  {
        'memberHandle': this.memberHandle,
        'isAdmin': value.publicWork,
        'status': 'pending'
      }
      console.log(JSON.stringify(form))
      const headers = this.tokenService.getAuthHeader();
      // this.store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
       this.http.put(this.apiLink + '/portal/organization/inviteMember/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
      this.adminNameForm.reset();
    }
  }

  reset() {
    this.adminNameForm.patchValue({
      adminName: '',
      publicWork: true
    });
  }
  onSearch() {
  if (this.admin !== null || this.admin !== '') {
    this.recipientsListState = true;
    console.log('searching')
    this.store.dispatch({ type: OrganizationActions.GET_RECEIPIENT, payload: this.admin});
  } else {
    console.log('not searching')
    this.recipientsListState = !this.recipientsListState;
  }
 }

 toggleSelectSkill(handle: any) {
  this.recipientsListState = !this.recipientsListState;
  if (handle) {
    for (const i in this.receipientList) {
      if (this.receipientList[i].handle === handle) {
        this.memberHandle = handle;
        this.adminNameForm.patchValue({
          'adminName': this.receipientList[i].name
        });
      }
    }
  }
}

  deleteOrganization() {
    if (this.organizationHandle !== 'undefined') {
      console.log('here')
      const headers = this.tokenService.getAuthHeader();
      console.log(this.apiLink)
      this.http.delete(this.apiLink + '/portal/organization/' + this.organizationHandle, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
      // this.store.dispatch({ type: OrganizationActions.ORGANIZATION_DELETE, payload: this.organizationHandle });
  }
}

hideList() {
  this.recipientsListState = false;
}

removeMember(handle: any) {

  const form = {
    'organizationHandle': this.organizationHandle,
    'memberHandle': handle,
    'status': 'remove'
  }
  const headers = this.tokenService.getAuthHeader();
   return this.http.put(this.apiLink + '/portal/organization/remove/member/deleteResponse', form , { headers: headers })
  .map((data: Response) => data.json())
  .subscribe(response => {
    console.log('finally its a success' + response)
  });
}
  updateCheckedOptions(option, event) {
    console.log(option);
    const val = option.name;
    console.log(val)
    console.log(event);
    if (option.name === 'Follow') {
      const form =  {
        'extras': {
        'settings': {
          follow : option.checked
        }
      }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Donation') {
      const form =  {
        'extras': {
        'settings': {
          donation : option.checked
        }
      }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Network') {
      const form =  {
        'extras': {
        'settings': {
          network : option.checked
        }
      }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Message') {
      const form =  {
        'extras': {
        'settings': {
          message : option.checked
        }
      }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
  }

}
