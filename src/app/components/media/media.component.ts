import { Component, OnInit, ViewChild } from '@angular/core';
import { TAB_COMPONENTS  } from '../../shared/tabs/tabset';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';

// Action
import { MediaActions } from '../../actions/media.action';
import { initialMedia, Media } from '../../models/media.model';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { FileUploadService } from './fakeService';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  providers: [ TAB_COMPONENTS, FileUploadService],
  styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit {
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

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private store: Store<Media> ) {

      // Forms
      this.createStatusForm();
      this.createMediaForm();

      // Reducer Store
      this.mediaState$ = store.select('mediaStore');
      this.mediaState$.subscribe((state) => {
        this.mediaStore = state;
      });

      this.reset(); // set initial state
    }

  filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    const formData = new FormData();

    if (!fileList.length) {
      return;
    }

    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

    // save it
    this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
    // console.log(formData);

    this.mediaService.upload(formData)
      .take(1)
      .subscribe(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      })
  }

  /**
   * Media Uploader Form
   */
  submitForm(value: any) {
    if ( this.mediaForm.valid === true ) {

      const postStatus = {
        owner: 'G_432743CB_0155_42A2_AC1F_6148C750B3D9MUNEEF_AURUT_COM',
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
    console.log('Initiated');
  }

  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status : ['', Validators.required ],
      privacy: ['', Validators.required ]
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

