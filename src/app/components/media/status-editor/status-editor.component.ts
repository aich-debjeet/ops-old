import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
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
  statusMessage = '';
  activeUser: UserCard;
  urlQuery: any;
  nameActive: boolean;
  ct_name: any;

  profileState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  statusSaved: boolean;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>
  ) {
    this.createStatusForm();
    // Reducer Store
    this.mediaState$ = store.select('mediaStore');
    this.profileState$ = store.select('profileTags');
    // Profile
    this.profileState$.subscribe((state) => {
      this.profileStore = state;
      const activeUser = this.profileStore.profile_cards.active;
      this.activeUser = activeUser;
    });
    // Media
    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.statusSaved = this.mediaStore.status_saved;
    });

    this.route.queryParams.subscribe(params => {
      this.urlQuery = params
      this.ct_name = params['ct_name']
      if (Object.keys(params).length) {
        this.nameActive = true;
      }
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
    const userHandle = this.profileStore.profile_cards.active.handle || '';
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
