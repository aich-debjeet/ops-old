import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

export class MediaComponent implements OnInit {
  statusForm: FormGroup;
  mediaForm: FormGroup;

  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  profileState$: Observable<ProfileModal>;
  mediaStore = initialMedia;
  profileStore = profileInit;
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';
  handle: string;
  page_message: string;
  userChannels: any;
  channelLoaded: boolean;
  urlQuery: any;

  userHandle$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private profStore: Store<any>,
    private store: Store<Media> ) {

      // Reducer Store
      this.mediaState$ = this.store.select('mediaStore');
      this.mediaState$.subscribe((state) => {
        this.mediaStore = state;
      });

      this.channelLoaded = false;
      this.userHandle$ = this.store.select('profileTags');

      this.route.queryParams.subscribe(params => {
        this.urlQuery = params
      });

      this.reset(); // set initial state
    }

  /**
   * Init Media Upload state
   */

  reset() {
    this.uploadError = null;
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
   * Close
   */
  doClose(bool: boolean = false) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }
}

