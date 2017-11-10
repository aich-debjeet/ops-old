import { Component, OnInit, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { ApiService } from '../../../helpers/api.service';

import { Http, Headers, Response } from '@angular/http';

import FilesHelper from '../../../helpers/fileUtils';

// Action
import { MediaActions } from '../../../actions/media.action';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';

import { initialTag, Follow } from '../../../models/auth.model';
import { ProfileModal } from '../../../models/profile.model';

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
  loginTagState$: Observable<Follow>;
  tagState$: Observable<ProfileModal>;
  mediaStore = initialMedia;
  editValues: any;
  people: any[];
  tags: any;
  selectedIndustry: string;
  selectedPrivacy: string;
  channelId: string;
  userHandle: string;

  profileChannel: any;
  forIndustries: any;
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
    private apiService: ApiService,
  ) {

    this.mediaState$ = store.select('mediaStore');
    this.editState$ = store.select('mediaStore').take(5);

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      // console.log('state');
      // console.log(this.mediaStore);
      if (typeof this.mediaStore.channel_detail['isOwner'] !== 'undefined' && this.mediaStore.channel_detail['isOwner'] !== true) {
        this.doClose(0);
      }
      if (typeof this.mediaStore.channel_detail['contributorProfile'] !== 'undefined') {
        this.people = this.mediaStore.channel_detail['contributorProfile'];
        this.tags = this.mediaStore.channel_detail['tags'];
        const industryArrLen = this.mediaStore.channel_detail['industryList'].length;
        this.selectedIndustry = this.mediaStore.channel_detail['industryList'][industryArrLen - 1];
        this.selectedPrivacy = this.mediaStore.channel_detail['accessSeetings'].access;
      }
    });

    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.forIndustries = state;
    });

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      console.log(state);
      this.channelSaved = this.profileChannel.channel_updated;

      // Success message
      if (this.channelSavedHere && this.channelSaved === true ) {
        this.toastr.success('Channel Updated');
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
      // console.log(params);
      if (typeof params['id'] !== 'undefined') {
        this.channelId = params['id'];
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      }
    });

    // Watch for Changes
    this.editState$.subscribe(event => {

      this.editValues = event;
      const channel = event.channel_detail;
      // console.log('channel');
      // console.log(channel);
      this.userHandle = channel.ownerHandle;

      this.channelForm = this.fb.group({
        title: [channel.channelName, Validators.required ],
        type: ['', Validators.required ],
        desc: [channel.description, Validators.required ],
        privacy: [this.selectedPrivacy, Validators.required ],
        openess: [1],
        // tags: ['tag1', 'tag2']
      });

    });
  }

  /**
   * Close
   */
  doClose(event) {
    // console.log('do close');
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  /**
   * Upate Form
   * @param formValue
   */
  updateChannel(value: any) {
    const userHandle = this.userHandle || '';
    const mediaTypeList = [];

    if ( this.channelForm.valid === true && userHandle !== '' ) {

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

      // Get only tag names from tag list
      const tagListAll = this.tags;
      const tagList = [];

      for (const tag of tagListAll) {
        // console.log(tag);
        if (typeof tag === 'string' || tag instanceof String) {
          tagList.push(tag);
        } else if (tag instanceof Object) {
          if (typeof tag.value !== 'undefined') {
            tagList.push(tag.value);
          }
        }
      }

      // console.log('tags');
      // console.log(tagList);
      // console.log('people');
      // console.log(peopleListList);

      const channelObj = {
        name: value.title,
        description: value.desc,
        industryList: [ value.type ],
        access: Number(value.privacy),
        accessSettings : { access : Number(value.privacy) },
        hashTags: tagList,
        otherFields: otherField
      }

      // console.log('UPDATE CHANNEL', channelObj);
      this.channelSavedHere = true;

      const reqParams = {
        channelData: channelObj,
        channelId: this.channelId
      }
      this.store.dispatch({ type: ProfileActions.CHANNEL_UPDATE, payload: reqParams });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  /**
   * Get people search
   */
  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const headers = this.apiService.getHeaders();
    const url  = this.apiLink + '/portal/searchprofiles/1/' + text + '/0/10';
    return this.http.get(url, { headers: headers }).map(data => data.json());
  };

}
