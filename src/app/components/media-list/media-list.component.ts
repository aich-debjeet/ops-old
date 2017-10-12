import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../models/media.model';

import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { environment } from '../../../environments/environment';

// action
import { MediaActions } from '../../actions/media.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AngularMasonry, MasonryOptions } from 'angular2-masonry';


@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  @ViewChild(AngularMasonry) masonry: AngularMasonry;
  tagState$: Observable<Media>;
  userState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  public editForm: FormGroup;
  channel = initialMedia ;
  channelId: string;
  imageLink: string = environment.API_IMAGE;
  pageLoading: boolean;
  // Options
  options: MasonryOptions = {
    // transitionDuration: '5.3s',
    initLayout: true,
    resize: true,
    percentPosition: true,
    // itemSelector: '.grid-item',
    // itemSelector: '.social-card',
    //  gutter: 10
  }

  constructor(
    private http: Http,
    // @Inject(forwardRef(() => AngularMasonry)) private masonryContainer: AngularMasonry,
    private _store: Store<Media>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService) {
      this.channelId = 'g-b93f98c2-a2ca-4b5b-afe5-457381255752';

      this.pageLoading = false;

      this.tagState$ = this._store.select('mediaStore');
      this.userState$ = this._store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.channel = state;
        console.log(this.channel);
        this.pageLoading = this.channel.channel_loading;
      });
      this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      this.buildEditForm();
  }

  ngOnInit() {
  }

  imageloaded() {

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
    console.log(data);
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
    console.log('close form');
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
    const posts = this.channel.channel_detail['media']
    const index: number = posts.indexOf(media);
    if (index !== -1) {
      posts.splice(index, 1);
      const id = media.id;
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

  /**
   * Subimt Edit
   */
  educationSubmit(form: any) {
    console.log('Submitting');
  }

  /**
   * Close
   */
  closeForm() {
    console.log('Closign Form');
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

}
