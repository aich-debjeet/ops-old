import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../models/media.model';

import { Router } from '@angular/router';

import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { environment } from '../../../environments/environment';

// action
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GeneralUtilities } from './../../helpers/general.utils';

@Component({
  selector: 'app-channel-inner',
  templateUrl: './channel-inner.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./channel-inner.component.scss']
})
export class ChannelInnerComponent implements OnInit, OnDestroy {
  // @ViewChild(AngularMasonry) masonry: AngularMasonry;
  tagState$: Observable<Media>;
  userState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  public editForm: FormGroup;
  channel = initialMedia ;
  channelId: string;
  imageLink: string = environment.API_IMAGE;
  pageLoading: boolean;
  isfollowing: boolean;
  contributors: any[];
  subscription: Subscription;
  channelPost: any;
  filterType: string | '';
  filterPost: string | '';

  constructor(
    private _store: Store<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private generalHelper: GeneralUtilities
  ) {

      this.channelId = route.snapshot.params['id'];
      this.pageLoading = false;
      this.tagState$ = this._store.select('mediaStore');
      this.userState$ = this._store.select('profileTags');
      this.tagStateSubscription = this.tagState$.subscribe((state) => {
        this.channel = state;
        this.pageLoading = this.channel.channel_loading;
        this.channelPost = state['channel_post']
      });

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.channelId = params['id'];
        this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        const body = {
          channelId: this.channelId,
          limit: 10,
          mType: this.filterType,
          sort_field: this.filterPost,
          sort_order: 'desc'
        }
        this.getChannelPost();
        this.buildEditForm();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.tagStateSubscription.unsubscribe();
  }

  mediaNext($event) {
  }

  type(value) {
    this.filterType = value;
    this.getChannelPost();
    console.log(value);
  }

  postFilter(value) {
    this.filterPost = value;
    this.getChannelPost();
  }

  getChannelPost() {
    const body = {
      channelId: this.channelId,
      limit: 10,
      mType: this.filterType,
      sort_field: this.filterPost,
      sort_order: 'desc'
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
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
  }

  /**
   * Delete Post
   */
  deletePost(media) {
    const posts = this.channel.channel_detail['media'];
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
    if (this.isfollowing === true) {
      this.following (type = false, channelId)
      this.isfollowing = false;
      return
    } else {
      this.following (type = true, channelId);
      this.isfollowing = true;
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

}
