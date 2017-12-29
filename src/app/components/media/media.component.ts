import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { TabComponents  } from '../../shared/tabs/tabset';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';
import { ModalService } from '../../shared/modal/modal.component.service';

// Action
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { initialMedia, Media } from '../../models/media.model';
import { ProfileModal, initialTag as profileInit } from '../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { FileUploadService } from './fakeService';

import * as MediumEditor from 'medium-editor';
// Blog

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  providers: [ TabComponents, FileUploadService, ModalService],
  styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit, AfterViewInit {
  statusForm: FormGroup;
  mediaForm: FormGroup;

  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  profileState$: Observable<ProfileModal>;
  mediaStore = initialMedia;
  profileStore = profileInit;
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';
  files: any[];
  showChannelList: boolean;
  token: string;
  handle: string;
  textVar: string;
  placeholderVar: string;
  page_message: string;
  userChannels: any;
  tempChannel: string;
  channelLoaded: boolean;

  userHandle$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private profStore: Store<any>,
    private store: Store<Media> ) {
      // Vars
      this.textVar = 'title';
      this.placeholderVar = 'Write something';
      // Forms
      this.createStatusForm();
      // this.createMediaForm();

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser.access_token; // your token

      // Reducer Store
      this.mediaState$ = this.store.select('mediaStore');
      this.mediaState$.subscribe((state) => {
        this.mediaStore = state;
      });

      this.channelLoaded = false;
      this.userHandle$ = this.store.select('profileTags');

      // ## Profile
      // -------------------------
      // this.profileState$ = profStore.select('profileTags');
      // this.profileState$.subscribe((state) => {

      //   this.profileStore = state;
      //   const userHandle = this.profileStore.profile_navigation_details.handle;

      //   if (userHandle) {
      //     if (this.profileStore.user_channel.length < 1) {
      //     }
      //   }
      // });

      this.reset(); // set initial state
    }

  ngAfterViewInit() {
  }

  loadChannels(handle: string) {
    if (handle) {
      this.profStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: handle });
    }
  }

  /**
   * Show/Hide Channel Dropdown List
   */
  toggleChannelList() {
    this.showChannelList = !this.showChannelList;
  }
  /**
   * Init Media Upload state
   */

  reset() {
    // this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  /**
   * Media Uploader Form
   */
  submitStatusForm(value: any) {

    if ( this.statusForm.valid === true ) {
      const postStatus = {
        owner: this.handle,
        feed_type: 'status',
        title: '',
        description: value.status,
        access: 0,
        active: true
      };

      this.postStatus( postStatus );
    }
  }

  /**
   * Upload Files
   * @param req
   */
  postMedia() {
    //
  }

  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
  }

  ngOnInit() {
    //
  }

  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status : ['', Validators.required ],
      privacy: [ 0 ]
    })
  }

  /**
   * Media Form
   */
  createMediaForm() {
    this.mediaForm = this.fb.group({
      files : ['', Validators.required ]
    })
  }

  /**
   * Close
   */
  doClose(bool: boolean = false) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }
}

