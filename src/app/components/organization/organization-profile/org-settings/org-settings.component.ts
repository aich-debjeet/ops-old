import { Component, OnInit, Renderer } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';

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
  imageBaseLink: string = environment.API_IMAGE;
  existingMembers: any = [];
  membersLoading: boolean;
  selectedOption = [];
  followOption = {name: 'Follow', value: 'Follow', checked: true};
  donationOption = {name: 'Donation', value: 'Donation', checked: true};
  networkOption = {name: 'Network', value: 'Network', checked: true};
  messageOption = {name: 'Message', value: 'Message', checked: true};
  defaultSettings: any;
  orgDetails = true;

  constructor(
    private http: Http,
    private store: Store<any>,
    private toastr: ToastrService,
    private _fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private render: Renderer
  ) {
    this.adminNameForm = this._fb.group({
      'adminName' : ['' , [Validators.required]],
      'publicWork': true
    });

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      if (state.profile_navigation_details.isOrganization === true && this.orgDetails) {
        this.organizationHandle = state.profile_navigation_details.organization.organizationHandle;
        this.store.dispatch({type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE, payload: this.organizationHandle});
        this.orgDetails = false;
      }
    });

    this.orgStates$ = this.store.select('profileTags')
    this.orgStates$.subscribe((state) => {
      this.orgProfile = state;
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
      // if (state.org_deletion_success) {
      //   console.log('success')
      //   this.toastr.success('Organization deletion Success');
      // }
      // if (state.org_deletion_failed) {
      //   console.log('failed')
      //   this.toastr.success('Organization deletion failed');
      // }
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

  toggleView(event: any, tab: String) {
    event.preventDefault();
    // this.render.setElementClass(event.target, 'active', true);
    if (tab === 'general') {
      this.render.setElementClass(event.target, 'active', true);
      this.selectedView = true;
      this.store.dispatch({type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE, payload: this.organizationHandle});
    }
    if (tab === 'admin') {
      this.store.dispatch({type: OrganizationActions.GET_MEMBERS, payload: this.organizationHandle});
      this.render.setElementClass(event.target, 'active', true);
      this.selectedView = false;
    }
  }
  display() {
    if (!this.show) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  display1() {
    if (!this.show1) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }
  adminUpdate(value) {
    if ( this.adminNameForm.valid === true ) {
      const form =  {
        'memberHandle': this.memberHandle,
        'isAdmin': value.publicWork,
        'status': 'pending'
      }
      const headers = this.tokenService.getAuthHeader();
      // this.store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
       this.http.put(this.apiLink + '/portal/organization/inviteMember/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
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
    this.store.dispatch({ type: OrganizationActions.GET_RECEIPIENT, payload: this.admin});
  } else {
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
      const headers = this.tokenService.getAuthHeader();
      this.http.delete(this.apiLink + '/portal/organization/' + this.organizationHandle, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        this.toastr.success('Organization deletion Success');
        this.router.navigate(['profile']);
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
    this.toastr.success('This member has been successfully been removed');
  });
}
  updateCheckedOptions(option, event) {
    const val = option.name;
    if (option.name === 'Follow') {
      const form =  {
        'extras': {
          'settings': {
            follow : option.checked
          }
        }
      }

     const headers = this.tokenService.getAuthHeader();
      this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
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

      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
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

      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
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

      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/organization/' + this.organizationHandle, form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
  }

}
