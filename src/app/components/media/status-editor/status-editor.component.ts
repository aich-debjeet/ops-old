import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./status-editor.component.scss']
})

export class StatusEditorComponent implements OnInit, OnDestroy {
  chosenChannel: any = 0;
  @Input() userChannels;
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  profileState = initialTag;
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
  uploadState: Number;
  channelList: any[];
  userHandle: string;
  user_channel_scroll_id: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>,
    private profileStore: Store<ProfileModal>
  ) {
    this.uploadState = 1;
    this.createStatusForm();
    this.userHandle = localStorage.getItem('loggedInProfileHandle');
    this.loadChannel(this.userHandle, null);
    // Reducer Store
    this.mediaState$ = store.select('mediaStore');
    this.profileState$ = store.select('profileTags');
    // Profile
    this.mediaStateSubscription = this.profileState$.subscribe((state) => {
      this.profileState = state;
      const activeUser = this.profileState.profile_cards.active;
      this.activeUser = activeUser;
      if (state.user_channels_loaded) {
        this.channelList = state.user_channel;
      }
      if (state && state['user_channel_scroll_id']) {
        this.user_channel_scroll_id = state['user_channel_scroll_id']
      }
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
    console.log('selected channel', this.chosenChannel);
  }

  choosePrivacy(value) {
    this.privacy = value
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.mediaStateSubscription.unsubscribe();
  }

  /**
   * Status Form
   */
  submitStatusForm() {
    this.uploadState = 2;
    // const userHandle = this.profileStore.profile_cards.active.handle || '';
    // const message = (this.statusMessage || '').trim().length === 0;
    // if (!message && userHandle !== '') {
    //   const postStatus = {
    //     owner: userHandle,
    //     feed_type: 'status',
    //     title: '',
    //     description: this.statusMessage,
    //     access: Number(this.privacy),
    //     active: true
    //   };
    //   this.uploadStatus(postStatus);
    // }
  }

  /**
   * Post Status
   * @param req
   */
  uploadStatus(req: any) {
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

  /**
   * Load Channel
   */
  loadChannel(handle: string, scrolled: any) {
    const body = {
      'limit': 30,
      'superType': 'channel',
      'owner': handle,
      'searchText': '',
      'scrollId': scrolled
    }
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: body });
  }

  /**
   * Post status to Channel
   */
  postStatusToChannel(channelDetails: string) {
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
      .subscribe( data => {
        this.toastr.success('Your post has been successfully posted to your channel');
        this.router.navigate(['/channel/' + channelId]);
      });
  }

  scrolled($event) {
    this.loadChannel(this.userHandle, this.user_channel_scroll_id);
  }

  searchChannel(text) {
    const body = {
      'limit': 30,
      'superType': 'channel',
      'owner': this.userHandle,
      'searchText': text,
      'scrollId': null
    }
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: body });
  }

  /**
   * Switch View
   */
  changeState(state: number) {
    this.uploadState = state;
  }
}
