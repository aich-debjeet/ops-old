import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';
import { ProfileActions } from 'app/actions/profile.action';
import { AuthActions } from '../../../actions/auth.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.staging';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

// google location api
import {} from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { UserCard } from 'app/models/profile.model';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  // @ViewChild('editor') editor: QuillEditorComponent;

  createOppFrm: FormGroup;
  orgHandle = '';
  opportunityState$: any;
  opportunityState: any;
  isSaved = false;
  formData: any;
  createClicked = false;
  showCreateChannel = false;
  userProfileState$: any;
  userProfile: any;
  channelList: any[];
  selectedChannelId = '';
  channelForm: FormGroup;
  loginTagState$: Observable<any>;
  industries: any[];
  channelSavedHere: boolean;
  channelSaved = false;
  baseUrl = environment.API_IMAGE;

  showPrivacyOptions = false;
  privacyValue = 0;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // Address --
  address: string;
  country: string;
  state: string;
  postalCode: string;
  city: string;
  activeProfile: UserCard;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private store: Store<OpportunityModel>,
    private mediaStore: Store<Media>,
    private localStorageService: LocalStorageService
  ) {
    this.channelSaved = false;
    this.channelSavedHere = false;

    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.industries = state.industries;
    });

    this.userProfileState$ = this.mediaStore.select('profileTags');
    this.userProfileState$.subscribe(data => {
      if (data && data.profile_navigation_details) {
        this.userProfile = data.profile_navigation_details;
        if (data.channel_saved) {
          this.channelSaved = data.channel_saved;
        }
      }
      if (data && data.user_following_channels_loaded) {
        this.channelList = data.user_following_channel;
      }
      if (data && data.channel_created_details && data.channel_created_details.SUCCESS && data.channel_created_details.SUCCESS.id) {
        this.selectedChannelId = data.channel_created_details.SUCCESS.id;
      }
      // success message
      if (this.channelSavedHere && this.channelSaved === true ) {
        this.toastr.success('Channel has been created successfully!');
        this.createChannelForm();
        this.channelSavedHere = false;
        // submitting opportunity
        this.postOpportunity(this.formData);
      }
    });

    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$
    .first(state => {
      this.opportunityState = state;
      // check if opportunity created successfully
      if (this.opportunityState && this.opportunityState.create_opportunity_data && this.opportunityState.create_opportunity_data.SUCCESS) {
        if (this.isSaved === false) {
          this.isSaved = true;
          this.toastr.success('Opportunity has been created successfully!');
        }
        this.resetOppForm();

        // redirecting to the created job
        const jobId = this.opportunityState.create_opportunity_data.SUCCESS.id;
        setTimeout(() => {
          this.router.navigate(['/opportunity/view/' + jobId]);
        }, 2000);
        this.opportunityState.create_opportunity_data = [];
      }
    })
    .subscribe((state) => { });

    // create opp form
    this.createOppForm();

    // create channel form
    this.createChannelForm();
  }

  /**
   * Creating the reactive form
   */
  createOppForm() {
    // reactive from group
    this.createOppFrm = this.fb.group({
      oppType: ['', [Validators.required]],
      role: ['', [Validators.required]],
      description: ['', [Validators.required]],
      yearsExpFrom: [''],
      yearsExpTo: [''],
      salaryAmount: [''],
      salaryDuration: [''],
      salaryCurrency: [''],
      oppDuration: [''],
      oppLocation: ['', [Validators.required]],
      oppLevel: [''],
      userSkills: [''],
      userQualifications: [''],
      orgName: [''],
      country: [''],
      attachments: [''],
      industry: ['', Validators.required]
    });
  }

  /**
   * Reset the form to empty/default values
   */
  resetOppForm() {
    this.createOppForm();
  }

  ngOnInit() {
    // loading indutries
    this.loadIndustries();

    // check organziation page already created
    this.store.select('profileTags')
    .first(profile => profile['current_user_profile_loading'] === true)
    .subscribe( data => {
      /**
       * @TODO
       * What happens if the current user,
       * without switching to org comes here?
       */
      this.activeProfile = data['profile_cards'].active;
      // bad logics
      if (this.activeProfile.isOrg) {
        this.orgHandle = this.activeProfile.handle;
      } else {
        if (data['profile_cards'].other && data['profile_cards'].other.isOrg) {
          this.orgHandle = data['profile_cards'].other.isOrg;
        }
      }

    });
  }

  // channel select
  channelSelection(formData: any) {
    // validation step
    if (!this.createOppFrm.valid) {
      window.scrollTo(0, 0);
      return;
    }

    this.createClicked = true;
    this.formData = formData;

    // loading channels
    this.loadChannels();
  }

  /**
   * Load current user channels
   */
  loadChannels() {
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: 'user' });
  }

  /**
   * Load industries
   */
  loadIndustries() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  // opp create form submit
  postOpportunity(formData: any) {

    // validation step
    if (!this.createOppFrm.valid) {
      return;
    }

    // preparing skills for req body
    let skillsArr = [];
    if (formData.userSkills && formData.userSkills.length > 0) {
      skillsArr = formData.userSkills.split(',');
    }

    // preparing qualifications for req body
    let qualificationsArr = [];
    if (formData.userQualifications && formData.userQualifications.length > 0) {
      qualificationsArr = formData.userQualifications.split(',');
    }

    // create opp request object
    const reqObj = {
      title: formData.oppType,
      role: formData.role,
      description: formData.description,
      experience: {
        experienceFrom: Number(formData.yearsExpFrom),
        experienceTo: Number(formData.yearsExpTo)
      },
      salary: {
        amount: Number(formData.salaryAmount),
        salaryType: formData.salaryDuration,
        currency: formData.salaryCurrency
      },
      organization: this.orgHandle,
      organizationName: formData.orgName,
      jobType: formData.oppType,
      skills: skillsArr,
      attachment: [''],
      qualification: qualificationsArr,
      count: {
        like: [],
        spots: [],
        channel: [this.selectedChannelId]
      },
      industry: [ formData.industry ]
    };

    // create the opportunity
    this.store.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqObj
    });

  }

  /**
   * Choose a channel
   * @param channel
   */
  chooseChannel(channel: any) {
    // adding reference of the selected channel
    this.selectedChannelId = channel.spotfeedId;

    // create the opportunity with the selected channel id
    this.postOpportunity(this.formData);
  }

  /**
   * Create channel form builder
   */
  createChannelForm() {
    // Empty initiate form
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      // privacy: [0, Validators.required ]
    })
  }

  /**
   * Create channel
   */
  createChannel(value: any) {
    const userHandle = this.userProfile.handle || '';
    const mediaTypeList = [];

    // set profile handle to user handle
    let profileHandle = userHandle;

    // check if creator is user or organization
    if (localStorage.getItem('active_profile') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        profileHandle = localStore.handle;
      }
    }

    if ( this.channelForm.valid === true && profileHandle !== '' ) {

      const hashTags = [];

      const channelObj = {
        name: value.title,
        owner: profileHandle,
        mediaTypes: mediaTypeList,
        industryList: [ value.type ],
        superType: 'channel',
        access: Number(this.privacyValue),
        description: value.desc,
        accessSettings : { access : Number(this.privacyValue) },
        hashTags: hashTags
      }

      this.channelSavedHere = true;
      this.mediaStore.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  /**
   * Location find from google
   */
  getLocationGoogle() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    });

      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          for (let i = 0; i < place.address_components.length; i++) {
            const addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
              const val = place.address_components[i][componentForm[addressType]];
              if ( addressType === 'country') {
                this.country = val;
              }
              if ( addressType === 'postal_code') {
                this.postalCode = val;
              }
              if ( addressType === 'locality') {
                this.city = val
              }
              if ( addressType === 'administrative_area_level_1') {
                this.state = val
              }
            }
          }

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  /**
   * Display privacy option on channel selection
   */
  togglePrivacyOptions() {
    if (this.showPrivacyOptions === true) {
      this.showPrivacyOptions = false;
    } else {
      this.showPrivacyOptions = true;
    }
  }

  /**
   * Set the privacy value for the form reference
   */
  selectPrivacy(value: any) {
    this.privacyValue = value;
    this.togglePrivacyOptions();
  }

}
