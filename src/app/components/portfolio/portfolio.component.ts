import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModal } from '../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { ModalService } from '../../shared/modal/modal.component.service';
import { Modal } from '../../shared/modal-new/Modal';
import { ProfileActions } from '../../actions/profile.action';
import { GeneralUtilities } from '../../helpers/general.utils';
import { environment } from 'environments/environment';

import { filter as _filter } from 'lodash';
import { findIndex as _findIndex } from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  @ViewChild('editCategoriesModal') editCategoriesModal: Modal;

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
  portCategories: any[];
  portAddCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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
              if (this.selectedMedia.indexOf(this.userMedia[i].mediaId) > -1) {
                this.userMedia[i].isSelected = true;
              } else {
                this.userMedia[i].isSelected = false;
              }
            }
            // console.log('this.userMedia', this.userMedia);
          }
        }
        if (this.generalUtils.checkNestedKey(state, ['get_portfolio_categories_result'])) {
          this.portCategories = state['get_portfolio_categories_result'];
          console.log('this.portCategories', this.portCategories);
          // this.portCategories = [];
        }
      }
    });

    this.portAddCategoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }

  /**
   * add category
   */
  portAddCategory(formData: any) {
    if (this.portAddCategoryForm.valid === true) {
      this.profileStore.dispatch({
        type: ProfileActions.ADD_PORTFOLIO_CATEGORY,
        payload: { name: formData.categoryName }
      });
    }
  }

  /**
   * edit category
   */
  editCategoryName(category: any) {
    // if () {
    //   this.profileStore.dispatch({ type: ProfileActions.UPDATE-CATEGORY_NAME, payload:  });
    // }
  }

  /**
   * mark media selected
   */
  mediaToggleMarkSelection(action: string, mediaId: string) {
    // console.log('ACTION', action);
    // console.log('BEFORE this.userMedia', this.userMedia);
    const mdIndx = _findIndex(this.userMedia, (m) => m.mediaId === mediaId);
    // console.log('mediaId', mediaId);
    // console.log('mdIndx', mdIndx);
    if (mdIndx) {
      if (action === 'add') {
        this.userMedia[mdIndx].isSelected = true;
      } else {
        this.userMedia[mdIndx].isSelected = false;
      }
    }
    // console.log('AFTER this.userMedia', this.userMedia);
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
    // check if media already selected, remove media if exist
    if (this.selectedMedia.indexOf(mediaId) > -1) {
      this.selectedMedia = _filter(this.selectedMedia, (m) => m !== mediaId);
      this.mediaToggleMarkSelection('remove', mediaId);
    } else { // add media
      this.selectedMedia.push(mediaId);
      this.mediaToggleMarkSelection('add', mediaId);
    }
    // console.log('this.selectedMedia', this.selectedMedia);
  }

  showCategories() {
    this.editCategoriesModal.open();
    this.profileStore.dispatch({ type: ProfileActions.GET_PORTFOLIO_CATEGORIES, payload: '' });
  }

}
