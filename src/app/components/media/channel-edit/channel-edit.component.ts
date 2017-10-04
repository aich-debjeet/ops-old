import { Component, OnInit, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';

import { Http, Headers, Response } from '@angular/http';

import FilesHelper from '../../../helpers/fileUtils';

// Action
import { MediaActions } from '../../../actions/media.action';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';

import { initialTag, Follow } from '../../../models/auth.model';

import { map as _map } from 'lodash';
import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  providers: [ ModalService ],
  styleUrls: ['./channel-edit.component.scss']
})

export class EditChannelComponent implements OnInit {
  imageLink: string = environment.API_IMAGE;
  messageText: string;
  channelForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  editState$: Observable<any>;
  tagState$: Observable<Follow>;
  mediaStore = initialMedia;
  industryList: any;
  editValues: any;
  people: any[];
  tags: any;
  selectedIndustry: string;
  selectedPrivacy: string;

  profileChannel: any;
  channelSaved = false;
  channelSavedHere: boolean;

  private apiLink: string = environment.API_ENDPOINT;
  constructor(
    private fb: FormBuilder,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>,
    private toastr: ToastrService,
  ) {

    this.mediaState$ = store.select('mediaStore');
    this.editState$ = store.select('mediaStore').take(5);

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      console.log('state');
      console.log(this.mediaStore);
      if (typeof this.mediaStore.channel_detail['followersProfile'] !== 'undefined') {
        this.people = this.mediaStore.channel_detail['followersProfile'];
        this.tags = this.mediaStore.channel_detail['tags'];
        this.selectedIndustry = this.mediaStore.channel_detail['industryList'][0];
        // this.selectedPrivacy = this.mediaStore.channel_detail['accessSettings']['access'];
      }
    });

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.industryList = state;
      this.profileChannel = state;
      this.channelSaved = this.profileChannel.channel_saved;

      // Success message
      if (this.channelSavedHere && this.channelSaved === true ) {
        this.toastr.success('Channel Created');
        this.updateChannelForm();
        this.channelSavedHere = false;
      }
    });
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }


  /**
   * Load List of Skills (High Level)
   */
  industriesList() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});
  }

  ngOnInit() {

    // loading industry list
    this.industriesList();

    // reading route
    this.route.params.subscribe(params => {
      console.log(params);
      if (typeof params['id'] !== 'undefined') {
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: params['id'] });
      }
    });

    // Watch for Changes
    this.editState$.subscribe(event => {

      this.editValues = event;
      const channel = event.channel_detail;

      this.channelForm = this.fb.group({
        title: [channel.channelName, Validators.required ],
        type: ['', Validators.required ],
        desc: [channel.description, Validators.required ],
        privacy: [0, Validators.required ],
        openess: [1],
        // tags: ['tag1', 'tag2']
      });

    });
  }

  /**
   * Close
   */
  doClose(event) {
    console.log('do close');
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  /**
   * Upate Form
   * @param formValue
   */
  updateChannel(value: any) {
    const userHandle = this.profileChannel.profileUser.handle || '';
    const mediaTypeList = [];

    // Get only handles from user list
    const peopleListAll = this.people;
    const peopleList = _map(peopleListAll, 'handle');

    const peopleListList = [];

    for (const i of peopleList) {
      peopleListList.push({ handle: i });
    }

    let otherField = {};
    if (peopleListList.length > 0 ) {
      otherField = { contributerList: peopleListList }
    }

    if ( this.channelForm.valid === true && userHandle !== '' ) {

      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(value.privacy) },
        owner: userHandle,
        industryList: [ value.type ],
        mediaTypes: mediaTypeList,
        otherField
      }

      console.log('CREATE', channelObj );
      this.channelSavedHere = true;
      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  /**
   * Status Form
   */
  updateChannelForm() {
    // Empty initiate form
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [1]
    })
  }

  /**
   * Get people search
   */
  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url  = this.apiLink + '/portal/searchprofiles/1/' + text + '/0/10';
    return this.http
      .get(url)
      .map(data => data.json());
  };

}
