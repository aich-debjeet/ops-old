import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { TAB_COMPONENTS  } from '../tabs/tabset';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';

// Action
import { MediaActions } from '../../actions/media.action';
import { initialMedia, Media } from '../../models/media.model';
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
  providers: [ TAB_COMPONENTS, FileUploadService],
  styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit, AfterViewInit {
  statusForm: FormGroup;
  mediaForm: FormGroup;

  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  // @ViewChild('medias') fileInput;

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

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private store: Store<Media> ) {
      // Vars
      this.textVar = 'title';
      this.placeholderVar = 'Write something';
      // Forms
      this.createStatusForm();
      // this.createMediaForm();

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.handle = localStorage.getItem('currentUserID');
      this.token = currentUser.access_token; // your token

      // Reducer Store
      this.mediaState$ = store.select('mediaStore');
      this.mediaState$.subscribe((state) => {
        this.mediaStore = state;
      });

      this.reset(); // set initial state
    }

  ngAfterViewInit() {
    //
  }

  /**
   * Show/Hide Channel Dropdown List
   */
  toggleChannelList() {
    this.showChannelList = !this.showChannelList;
  }

  /**
   * File Watcher
   * @param fieldName
   * @param fileList
   */
  filesChange(fieldName: string, fileList: FileList) {
    if (!fileList.length) {
      return;
    }

    const fd = new FormData();

    Array
      .from(Array(fileList.length).keys())
      .map( x => {
        fd.append(fieldName, fileList[x], fileList[x].name);
      });

    // // Save it
    // for (let pair of fd.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    this.save(fd);
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
   * Save Medias
   * @param formData
   */
  save(formData: FormData) {
    // Upload data to the server
    // this.currentStatus = this.STATUS_SAVING;
    console.log(formData);
    this.store.dispatch({ type: MediaActions.MEDIA_UPLOAD, payload: formData });
  }

  /**
   * Media Uploader Form
   */
  submitStatusForm(value: any) {

    console.log(value);

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
    console.log(req);
    this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
  }

  ngOnInit() {
    console.log('Initiated');
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
}

