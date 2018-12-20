import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';
import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
import { ToastrService } from 'ngx-toastr';
import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./status-editor.component.scss']
})

export class StatusEditorComponent implements OnInit, OnDestroy {
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaState = initialMedia;
  profileState = initialTag;
  baseUrl = environment.API_IMAGE;
  privacy: any = 0;
  statusMessage = '';
  activeUser: UserCard;
  urlQuery: any;
  nameActive: boolean;
  ct_name: any;
  profileState$: Observable<ProfileModal>;
  statusSaved: boolean;
  uploadState: Number;
  userHandle: string;
  user_channel_scroll_id: any;

  external_post_active = false;
  ct_id: any;
  post_to: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private mediaStore: Store<Media>,
    private profileStore: Store<ProfileModal>
  ) {
    // if redriect url there
    if (this.route.snapshot.queryParams['post_to'] === 'community' || this.route.snapshot.queryParams['post_to'] === 'channel') {
      if (this.route.snapshot.queryParams['post_to'] && this.route.snapshot.queryParams['ct_id']) {
        this.external_post_active = true;
        this.ct_id = this.route.snapshot.queryParams['ct_id'];
        this.post_to = this.route.snapshot.queryParams['post_to'];
      }
    }
    this.uploadState = 1;
    this.createStatusForm();
    this.userHandle = localStorage.getItem('loggedInProfileHandle');
    // Reducer Store
    this.mediaState$ = mediaStore.select('mediaStore');
    this.profileState$ = mediaStore.select('profileTags');
    // Profile
    this.mediaStateSubscription = this.profileState$.subscribe((state) => {
      this.profileState = state;
      this.activeUser = this.profileState.profile_cards.active;
      if (state && state['user_channel_scroll_id']) {
        this.user_channel_scroll_id = state['user_channel_scroll_id']
      }
    });
    // Media
    this.mediaState$.subscribe((state) => {
      this.mediaState = state;
      this.statusSaved = this.mediaState.status_saved;
    });
    this.route.queryParams.subscribe(params => {
      this.urlQuery = params
      this.ct_name = params['ct_name']
      if (Object.keys(params).length) {
        this.nameActive = true;
      }
    });
  }

  choosePrivacy(value) {
    this.privacy = value
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mediaStateSubscription.unsubscribe();
  }

  /**
   * Status Form
   */
  submitStatusForm() {
    this.uploadState = 2;
  }

  /**
   * Post Status
   * @param req
   */
  uploadStatus(req: any) {
    this.mediaStore.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
    this.mediaStore.select('mediaStore')
      .first(post => post['status_saved'] === true)
      .subscribe(data => {
        this.toastr.success('Successfully posted your status', '', {
          timeOut: 3000
        });
        this.router.navigate(['/user/status/list']);
      });
  }

  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
      privacy: [0, Validators.required]
    })
  }

  /**
   * Post status to Channel
   */
  postStatusToChannel(channelDetails: any) {
    const channelId = channelDetails['spotfeedId'];
    const postData = {
      channelId: channelId,
      reqBody: {
        feed: [{
          owner: this.userHandle,
          feed_type: 'status',
          title: '',
          description: this.statusMessage,
          access: this.privacy,
          active: true
        }]
      }
    };
    this.profileStore.dispatch({ type: ProfileActions.POST_CHANNEL_STATUS, payload: postData });
    this.profileStore.select('profileTags')
      .first(state => state['status_channel_posted'] === true)
      .subscribe(data => {
        console.log('post status: ', data);
        // this.router.navigate(['/channel/' + channelId]);
      });
  }

  /**
   * Switch View
   */
  changeState(state: number) {
    this.uploadState = state;
  }
}
