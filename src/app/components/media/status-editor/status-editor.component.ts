import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./status-editor.component.scss']
})

export class StatusEditorComponent {
  chosenChannel: any = 0;
  @Input() userChannels;
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  profileStore = initialTag;
  baseUrl = environment.API_IMAGE;
  privacy: any = 0;
  statusMessage: string;

  profileState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  statusSaved: boolean;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<Media>
  ) {
    this.createStatusForm();
    // Reducer Store
    this.mediaState$ = store.select('mediaStore');
    this.profileState$ = store.select('profileTags');
    // Profile
    this.profileState$.subscribe((state) => {
      this.profileStore = state;
      console.log(this.profileStore);
    });
    // Media
    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.statusSaved = this.mediaStore.status_saved;
    });
  }
  /**
   * on Channel Selection
   */
  onChannelSelection(channel: any) {
    this.chosenChannel = channel;
  }

  choosePrivacy(value) {
    this.privacy = value
  }

  /**
   * Status Form
   */
  submitStatusForm() {
    const userHandle = this.profileStore.profile_navigation_details.handle || '';
    const message = (this.statusMessage || '').trim().length === 0;

    if ( !message && userHandle !== '') {
      const postStatus = {
        owner: userHandle,
        feed_type: 'status',
        title: '',
        description: this.statusMessage,
        access: Number(this.privacy),
        active: true
      };

      this.postStatus( postStatus );
    }
  }
  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });

    this.store.select('mediaStore')
      .first(post => post['status_saved'] === true)
      .subscribe( data => {
        console.log('save success');
        this.toastr.success('Successfully posted your status');
        this.router.navigate(['/user/status/list']);
      });
  }
  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status : ['', Validators.required ],
      privacy: [0, Validators.required ]
    })
  }
}
