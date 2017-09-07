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

import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { ProfileActions } from '../../actions/profile.action';

// Blog
import { TokenService } from '../../helpers/token.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  providers: [ TAB_COMPONENTS, FileUploadService],
  styleUrls: ['./create-channel.component.scss']
})

export class CreateChannelComponent {
  typeSelected: boolean;
  channelForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  handle: string;

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private tokenService: TokenService,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.handle = '';
      if (this.handle !== '') {
        this.handle = this.tokenService.getHandle();
      }
      this.tagState$ = this.store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
      });
    }


  showCreatechannelform() {
    this.typeSelected = true;
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['New Channel', Validators.required ],
      type: ['', Validators.required ],
      desc: ['Soem rand desc', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [0]
    })
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const accessVal = parseInt(value.privacy, 0);

    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        access: value.privacy,
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : accessVal },
        owner: this.tokenService.getHandle(),
        industryList: [ value.type ] /** @TODO - To be removed! */
      }

      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    }
  }

  // ngAfterViewInit() {
  //   //
  // }

  // /**
  //  * Show/Hide Channel Dropdown List
  //  */
  // toggleChannelList() {
  //   this.showChannelList = !this.showChannelList;
  // }

  // /**
  //  * File Watcher
  //  * @param fieldName
  //  * @param fileList
  //  */
  // filesChange(fieldName: string, fileList: FileList) {
  //   if (!fileList.length) {
  //     return;
  //   }

  //   const fd = new FormData();

  //   Array
  //     .from(Array(fileList.length).keys())
  //     .map( x => {
  //       fd.append(fieldName, fileList[x], fileList[x].name);
  //     });

  //   // // Save it
  //   // for (let pair of fd.entries()) {
  //   //   console.log(pair[0] + ', ' + pair[1]);
  //   // }

  //   this.save(fd);
  // }

  // /**
  //  * Init Media Upload state
  //  */

  // reset() {
  //   // this.currentStatus = this.STATUS_INITIAL;
  //   this.uploadedFiles = [];
  //   this.uploadError = null;
  // }

  // /**
  //  * Save Medias
  //  * @param formData
  //  */
  // save(formData: FormData) {
  //   // Upload data to the server
  //   // this.currentStatus = this.STATUS_SAVING;
  //   console.log(formData);
  //   this.store.dispatch({ type: MediaActions.MEDIA_UPLOAD, payload: formData });
  // }

  // /**
  //  * Media Uploader Form
  //  */
  // submitStatusForm(value: any) {
  //   if ( this.statusForm.valid === true ) {
  //     const postStatus = {
  //       owner: this.handle,
  //       feed_type: 'status',
  //       title: '',
  //       description: value.status,
  //       access: 0,
  //       active: true
  //     };

  //     this.postStatus( postStatus );
  //   }
  // }

  // /**
  //  * Upload Files
  //  * @param req
  //  */
  // postMedia() {
  //   //
  // }

  // /**
  //  * Post Status
  //  * @param req
  //  */
  // postStatus(req: any) {
  //   this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
  // }

  // ngOnInit() {
  //   console.log('Initiated');
  // }

  // /**
  //  * Status Form
  //  */
  // createStatusForm() {
  //   this.statusForm = this.fb.group({
  //     status : ['', Validators.required ],
  //     privacy: ['', Validators.required ]
  //   })
  // }

  // /**
  //  * Media Form
  //  */
  // createMediaForm() {
  //   this.mediaForm = this.fb.group({
  //     files : ['', Validators.required ]
  //   })
  // }

}

