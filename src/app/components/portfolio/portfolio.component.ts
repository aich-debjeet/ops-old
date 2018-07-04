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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  @ViewChild('editCategoriesModal') editCategoriesModal: Modal;
  @ViewChild('portMediaModal') portMediaModal: Modal;
  @ViewChild('mediaViewModal') mediaViewModal: Modal;

  profileState$: Observable<ProfileModal>;
  profileSub: ISubscription;
  profileState: any;
  userProfile: any;
  channels = [];
  filteredChannels = [];
  // portfolioEmpty = true;
  baseImageUrl = environment.API_IMAGE;
  ownProfile: boolean;
  isEmptyPortfolio: boolean;
  isEmptyCategory: boolean;
  recordsPerPage = 20;
  showPreloader = false;
  disablePublishButton = false;

  // router subscription
  routerSub: any;
  userMedia: any[];
  selectedMedia = [];
  selectedCategoryId = '';
  selectedChannels = [];
  displayMedia = [];
  portCategories = [];
  portAddCategoryForm: FormGroup;
  activeTab = 'all';
  mediaPerPage = 20;
  viewMedia: any;
  searchChannel = '';

  // add media scroll
  addMediaModalScrolling = 0;
  addMediaModalScrollingLoad = 251;
  addMediaModalPage = 0;

  // tab media scroll
  tabMediaScrolling = 0;
  tabMediaScrollingLoad = 251;
  tabMediaPage = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileStore: Store<ProfileModal>,
    public modalService: ModalService,
    private generalUtils: GeneralUtilities,
    private toastr: ToastrService
  ) {
    this.profileState$ = this.profileStore.select('profileTags');
    this.profileSub = this.profileState$.subscribe((state) => {
      this.profileState = state;
      if (state) {
        if (state['get_port_display_media'] === false && state['get_port_display_media_success'] === true
          && state['get_port_display_media_result'] && state['get_port_display_media_result'].length === 0
        ) {
          if (this.activeTab === 'all') {
            this.isEmptyPortfolio = true;
          } else {
            this.isEmptyCategory = true;
          }
        } else {
          if (this.activeTab === 'all') {
            this.isEmptyPortfolio = false;
          } else {
            this.isEmptyCategory = false;
          }
        }
        // console.log('isEmptyPortfolio', this.isEmptyPortfolio);
        // console.log('isEmptyCategory', this.isEmptyCategory);
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
          this.channelAssignCopy();
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
          for (let i = 0; i < this.portCategories.length; i++) {
            this.portCategories[i].isEditable = false;
          }
        }
        if (this.generalUtils.checkNestedKey(state, ['get_port_display_media_result'])) {
          this.displayMedia = state['get_port_display_media_result'];
        }
        if (state['create_portfolio_category'] === false && state['create_portfolio_category_success'] === true) {
          // this.portAddCategoryForm.controls['categoryName'].setValue('');
          // this.portAddCategoryForm.reset();
        }
        if (state['add_media_to_category'] ===  false && state['add_media_to_category_success'] ===  true) {
          // close add media modal
          this.portMediaModal.close();
          // swithc to the tab
          const catIndx = _findIndex(this.portCategories, (c) => c.categoryId === this.selectedCategoryId);
          this.selectTab(this.portCategories[catIndx]);
          // reset add media
          this.resetAddMedia();
          this.toastr.success('Media added to the category successfully!');
        }
      }
    });

    // this.profileStore.dispatch({ type: ProfileActions.GET_PORTFOLIO_CATEGORIES, payload: '' });
    this.profileStore.dispatch({
      type: ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA,
      payload: {
        categoryType: 'all',
        offset: 0,
        limit: this.mediaPerPage
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

  deleteCategory(catId: string) {
    this.profileStore.dispatch({
      type: ProfileActions.PORTFOLIO_DELETE_CATEGORY,
      payload: catId
    });
  }

  /**
   * edit category
   */
  catEditAction(action: string, catIndex: number) {
    if (this.portCategories[catIndex]) {
      if (action === 'enable') {
        this.portCategories[catIndex].isEditable = true;
      } else {
        this.portCategories[catIndex].isEditable = false;
      }
    }
  }

  updateCatName(newName: string, catIndex: number) {
    if (this.portCategories[catIndex]) {
      this.portCategories[catIndex].categoryName = newName;
    }
    // console.log('cats', this.portCategories);
  }

  saveNewCatName(catIndex: number) {
    this.profileStore.dispatch({ type: ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME, payload: {} });
  }

  /**
   * mark media selected
   */
  mediaToggleMarkSelection(action: string, mediaId: string) {
    // console.log('ACTION: ' + action + ', BEFORE: this.userMedia', this.userMedia);
    const mdIndx = _findIndex(this.userMedia, (m) => m.mediaId === mediaId);
    // console.log('mediaId' + mediaId + 'mdIndx' + mdIndx);
    if (mdIndx) {
      if (action === 'add') {
        this.userMedia[mdIndx].isSelected = true;
      } else {
        this.userMedia[mdIndx].isSelected = false;
      }
    }
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe((params) => {
      // load user profile by username
      if (this.generalUtils.checkNestedKey(params, ['username'])) {
        this.profileStore.dispatch({ type: ProfileActions.PORTFOLIO_PROFILE_LOAD, payload: params['username'] });
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
  showMediaSelection() {
    this.showPreloader = true;
    // get media
    const reqBody = {
      channelList: [],
      offset: 0,
      limit: this.recordsPerPage
    };
    this.getUserMedia(reqBody);

    // get channels
    this.profileStore.dispatch({ type: ProfileActions.GET_USERS_CHANNELS, payload: '' });
    this.portMediaModal.open();
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
      limit: this.recordsPerPage
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
   * tab media get
   */
  getTabMedia(reqBody: any) {
    this.profileStore.dispatch({ type: ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA, payload: reqBody });
  }

  /**
   * select/deselect media
   */
  toggleMediaSelection(mediaId: string) {
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
  }

  /**
   * add selected media to the portfolio
   */
  addMediaToPortfolio() {
    // check if at least 1 media is selected
    if (this.selectedMedia.length === 0) {
      this.toastr.warning('Please select media');
      return;
    }
    if (this.selectedCategoryId === '') {
      this.toastr.warning('Please select category');
      return;
    }

    // prepare request body for API
    const reqBody = {
      mediaList: []
    };

    for (let i = 0; i < this.selectedMedia.length; i++) {
      const mediaObj = {
        mediaId: this.selectedMedia[i],
        categoryId: this.selectedCategoryId
      };
      reqBody.mediaList.push(mediaObj);
      if (i >= (this.selectedMedia.length - 1)) {
        this.profileStore.dispatch({ type: ProfileActions.ADD_MEDIA_TO_CATEGORY, payload: reqBody });
      }
    }

  }

  resetAddMedia() {
    this.selectedCategoryId = '';
    this.displayMedia = [];
    this.selectedMedia = [];
    this.selectedChannels = [];
  }

  /**
   * select category
   */
  selectCategory(catVal: string) {
    this.selectedCategoryId = catVal;
  }

  /**
   * select tab
   */
  selectTab(cat: any) {
    this.activeTab = cat.categoryName;
    const reqBody = {
      categoryType: cat.categoryId,
      offset: 0,
      limit: this.mediaPerPage
    };
    this.getTabMedia(reqBody);
  }

  /**
   * show media popup
   */
  displayMediaPopup(mediaDetails: any) {
    this.viewMedia = mediaDetails;
    this.mediaViewModal.open();
  }

  publishAction(pubAction: string) {
    this.disablePublishButton = true;
    this.profileStore.dispatch({ type: ProfileActions.PORTFOLIO_PUBLISH_ACTION, payload: pubAction });
    setTimeout(() => {
      this.disablePublishButton = false;
      this.toastr.success('Portfolio has been ' + pubAction + 'ed successfully!');
    }, 500);
  }

  filterChannels(value) {
    if (!value) { this.channelAssignCopy(); }
    this.filteredChannels = Object.assign([], this.channels).filter(item => {
      return item.channelName.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  channelAssignCopy() {
    this.filteredChannels = Object.assign([], this.channels);
  }

  getCatIndexByName(catName: string) {
    return _findIndex(this.portCategories, (c) => c.categoryName === catName);
  }

  removeMediaFromCat(mediaId: string) {
    const catIndex = this.getCatIndexByName(this.activeTab);
    this.profileStore.dispatch({
      type: ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT,
      payload: {
        mediaId: mediaId,
        categoryId: this.portCategories[catIndex].categoryId
      }
    });
  }

  /**
   * close add media to portfolio modal
   */
  closePortAddMediaModal() {
    this.portMediaModal.close();
    this.resetAddMedia();
  }

  portMediaModalScroll(e) {
    this.addMediaModalScrolling = e.currentScrollPosition;
    if (this.addMediaModalScrollingLoad <= this.addMediaModalScrolling) {
      this.addMediaModalScrollingLoad += 500;
      this.addMediaModalPage += this.recordsPerPage;
      const reqBody = {
        channelList: this.selectedChannels,
        limit: this.recordsPerPage,
        offset: this.addMediaModalPage
      }
      this.getUserMedia(reqBody);
    }
  }

  tabMediaScroll(e) {
    console.log('tabMediaScroll', this.activeTab);
    this.tabMediaScrolling = e.currentScrollPosition;
    if (this.tabMediaScrollingLoad <= this.tabMediaScrolling) {
      this.tabMediaScrollingLoad += 500;
      this.tabMediaPage += this.recordsPerPage;
      let reqCat;
      if (this.activeTab === 'all') {
        reqCat = 'all';
      } else {
        const catIndex = this.getCatIndexByName(this.activeTab);
        reqCat = this.portCategories[catIndex].categoryId
      }
      const reqBody = {
        categoryType: reqCat,
        offset: this.tabMediaPage,
        limit: this.recordsPerPage
      };
      this.getTabMedia(reqBody);
    }
  }

}
