import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModal } from '../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { ModalService } from '../../shared/modal/modal.component.service';
import { ProfileActions } from '../../actions/profile.action';
import { GeneralUtilities } from '../../helpers/general.utils';
import { environment } from 'environments/environment';

import { filter as _filter } from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  profileState$: Observable<ProfileModal>;
  profileSub: ISubscription;
  profileState: any;
  userProfile: any;
  channels = [];
  portfolioEmpty = true;
  baseImageUrl = environment.API_IMAGE;
  ownProfile: boolean;
  requestsPerPage = 10;
  showPreloader = false;

  // router subscription
  routerSub: any;
  userMedia: any[];
  selectedMedia = [];
  selectedChannels = [];
  medias = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileStore: Store<ProfileModal>,
    public modalService: ModalService,
    private generalUtils: GeneralUtilities
  ) {
    this.profileState$ = this.profileStore.select('profileTags');
    this.profileSub = this.profileState$.subscribe((state) => {
      this.profileState = state;
      if (state) {
        if (this.generalUtils.checkNestedKey(state, ['portfolio_user_profile'])) {
          this.userProfile = state['portfolio_user_profile'];
          const loggedInProfileHandle = localStorage.getItem('loggedInProfileHandle');
          if (typeof this.ownProfile === 'undefined' && loggedInProfileHandle) {
            if (state['portfolio_user_profile']['handle'] === loggedInProfileHandle) {
              this.ownProfile = true;
            } else {
              this.ownProfile = false;
            }
          }
        }
        if (this.generalUtils.checkNestedKey(state, ['get_users_channels_result'])) {
          this.channels = state['get_users_channels_result'];
        }
        if (this.generalUtils.checkNestedKey(state, ['get_users_channels_result'])) {
          this.userMedia = state['get_users_media_result'];
          if (this.userMedia) {
            for (let i = 0; i < this.userMedia.length; i++) {
              // check if media id exists in selected medias
              if (this.selectedMedia.indexOf(this.userMedia[i]) > -1) {
                this.userMedia[i].isSelected = true;
              } else {
                this.userMedia[i].isSelected = false;
              }
            }
            console.log('this.userMedia', this.userMedia);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe((params) => {
      // load user profile by username
      if (this.generalUtils.checkNestedKey(params, ['username'])) {
        this.profileStore.dispatch({ type: ProfileActions.PROFILE_LOAD, payload: params['username'] });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  /**
   * show modal and popuplate the media
   */
  addWork() {
    this.showPreloader = true;
    // get media
    const reqBody = {
      channelList: [],
      offset: 0,
      limit: this.requestsPerPage
    };
    this.getUserMedia(reqBody);

    // get channels
    this.profileStore.dispatch({ type: ProfileActions.GET_USERS_CHANNELS, payload: '' });
    this.modalService.open('addWorkModal');
  }

  /**
   * select channel
   */
  toggleChannelSelection(e: any, channelId: string) {
    if (e.target.checked && e.target.checked === true) {
      if (this.selectedChannels.indexOf(channelId) === -1) {
        this.selectedChannels.push(channelId);
      }
    } else {
      if (this.selectedChannels.indexOf(channelId) > -1) {
        this.selectedChannels = _filter(this.selectedChannels, (c) => c !== channelId);
      }
    }
    // console.log(this.selectedChannels);
    // get channel media
    const reqBody = {
      channelList: this.selectedChannels,
      offset: 0,
      limit: this.requestsPerPage
    };
    this.getUserMedia(reqBody);
  }

  /**
   * user media get
   */
  getUserMedia(reqBody: any) {
    this.profileStore.dispatch({ type: ProfileActions.GET_USER_MEDIA, payload: reqBody });
  }

  /**
   * select/deselect media
   */
  toggleMediaSelection(mediaId: string) {
    // const umIndx = this.userMedia.indexOf(mediaId);
    // check if media already selected
    // remove media if exist
    if (this.selectedMedia.indexOf(mediaId) > -1) {
      this.selectedMedia = _filter(this.selectedMedia, (m) => m !== mediaId);
    } else { // add media
      this.selectedMedia.push(mediaId);
    }
    console.log(this.selectedMedia);
  }

}
