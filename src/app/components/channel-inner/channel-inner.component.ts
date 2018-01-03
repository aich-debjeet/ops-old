import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../models/media.model';

import { Router } from '@angular/router';

import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { environment } from '../../../environments/environment';

// action
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AngularMasonry, MasonryOptions } from 'angular2-masonry';
import { GeneralUtilities } from './../../helpers/general.utils';

@Component({
  selector: 'app-channel-inner',
  templateUrl: './channel-inner.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./channel-inner.component.scss']
})
export class ChannelInnerComponent implements OnInit {
  @ViewChild(AngularMasonry) masonry: AngularMasonry;
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

  constructor(
    private http: Http,
    private _store: Store<Media>,
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
      this.tagState$.subscribe((state) => {
        console.log('state', state)
        this.channel = state;
        this.pageLoading = this.channel.channel_loading;
      });
      this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      this.buildEditForm();

      this._store.select('mediaStore')
        .first(data => data['channel_detail'].ownerName)
        .subscribe( data => {
          this.isfollowing = data['channel_detail'].isFollowing;
          if (data['channel_detail'].contributorProfile) {
            this.contributors = this.generalHelper.getArrayWithLimitedLength(data['channel_detail'].contributorProfile, 3);
          }
        });

  }

  ngOnInit() {
    // this.isfollowing = this.channel.isFollowing || false;
  }

  mediaNext($event) {
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
    console.log('media', media)
    console.log('channel detail', this.channel.channel_detail['media'])
    const posts = this.channel.channel_detail['media']
    console.log('posts', posts)
    const index: number = posts.indexOf(media);
    console.log('index', index)
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
    }else {
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
