import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../models/media.model';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from '../../shared/modal-new/Modal';

import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxMasonryOptions } from 'ngx-masonry';

import { environment } from '../../../environments/environment';

// action
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-channel-inner',
  templateUrl: './channel-inner.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./channel-inner.component.scss']
})
export class ChannelInnerComponent implements OnInit, OnDestroy {
  tagState$: Observable<Media>;
  private tagStateSub: Subscription;
  public editForm: FormGroup;
  channel = initialMedia ;
  channelId: string;
  imageLink: string = environment.API_IMAGE;
  pageLoading: boolean;
  isFollowing: boolean;
  contributors: any[];
  routerSub: Subscription;
  channelPost: any;
  filterType: string | '';
  filterPost = 'spots';
  channelPostLoading: any;
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 600;
  scrollId: string;
  @ViewChild('deleteModal') deleteModal: Modal;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
  };

  constructor(
    private _store: Store<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private toastr: ToastrService,
    public gUtils: GeneralUtilities
  ) {
    this.channelId = route.snapshot.params['id'];
    this.pageLoading = false;
    this.tagState$ = this._store.select('mediaStore');
    this.tagStateSub = this.tagState$.subscribe((state) => {
      this.channel = state;
      this.pageLoading = this.channel.channel_loading;
      this.channelPost = state['channel_post'];
      this.channelPostLoading = state['channel_post_loading'];
      if (state) {
        if (state['channelPostScrollId']) {
          this.scrollId = state['channelPostScrollId']
        }
        if (this.gUtils.checkNestedKey(state, ['channel_detail', 'isFollowing'])) {
          this.isFollowing = state.channel_detail.isFollowing;
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(
      (params: any) => {
        this.scrollId = null
        this.channelId = params['id'];
        this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        this.getChannelPost(null);
        this.buildEditForm();
      }
    );
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.tagStateSub.unsubscribe();
  }

  mediaNext($event) {
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 900
      this.getChannelPost(this.scrollId);
    }
  }

  /**
   * Filter Types
   * @param value
   */
  type(value) {
    this.scrollId = null
    if (this.filterType === value) {
      this.filterType = '';
      this.getChannelPost(null);
      return
    }
    this.filterType = value;
    this.getChannelPost(null);
  }

  /**
   * Post Filter Types
   * @param value
   */
  postFilter(value) {
    this.scrollId = null
    this.filterPost = value;
    this.getChannelPost(null);
    return
  }

  getChannelPost(scrollId) {
    const body = {
      channelId: this.channelId,
      limit: 10,
      mType: this.filterType,
      sort_field: this.filterPost,
      sort_order: 'desc',
      scrollId: scrollId === null ? null : this.scrollId
    }
    this._store.dispatch({ type: MediaActions.GET_CURRENT_CHANNEL_POST, payload: body });
  }
   /**
   * Form initial value
   */
  buildEditForm(): void {
    this.editForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : ['' , [Validators.required]],
      // 'access' : ['' , [Validators.required]],
      // 'industry' : ['' , [Validators.required]],
    })
  }

  editPopup(data) {
    this.editForm.patchValue({
      name: data.channelName,
      bio: data.description,
      access: '',
      industry: ''
    });
    // Temp hide
    // this.modalService.open('editform');
  }

  closePopup() {
    this.modalService.close('editform');
  }

  // Media Popup
  mediaOpenPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    // this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
  }

  /**
   * Delete Post
   */
  deletePost(media) {
    const posts = this.channelPost;
    const index: number = posts.indexOf(media);
    if (index !== -1) {
      posts.splice(index, 1);
      const id = media.id;
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

  /**
   * Follow this channel
   */
  followChannel(type, channelId) {
    if (this.isFollowing === true) {
      this.following (type = false, channelId)
      this.isFollowing = false;
      return
    } else {
      this.following (type = true, channelId);
      this.isFollowing = true;
      return
    }
  }

  following (type, channelId) {
    const req = {
      channelId: channelId,
      state: type
    };
    this._store.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }
  /**
   * Subimt Edit
   */
  educationSubmit(form: any) {
  }

  /**
   * Close
   */
  closeForm() {
  }

  mediaClosePopup() {
    this.modalService.close('mediaPopup');
  }

  pineditFormPopup() {
    return;
  }

  submitComment(comment) {
    const send = {
      'content': comment,
      'parent': this.channel['media_detail'].id
    }
    this._store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
  }

  pinEditFormPopup() {
    //
  }

  addPostBtnClick() {
    this.router.navigateByUrl('/post/media');
  }

  confirmation(eve) {
    this.closeCancelApplicationModal();
    if (eve === 'yes') {
      this._store.dispatch({ type: ProfileActions.CHANNEL_DELETE, payload: this.channelId });
      this.toastr.success('Your channel has been deleted successfully!');
      this.router.navigateByUrl('/profile/user');
    }
  }

  closeCancelApplicationModal() {
    this.deleteModal.close();
  }

}
