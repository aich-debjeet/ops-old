import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-channel-inner',
  templateUrl: './channel-inner.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./channel-inner.component.scss']
})
export class ChannelInnerComponent implements OnInit {
  tagState$: Observable<Media>;
  userState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  public editForm: FormGroup;
  channel = initialMedia ;
  channelId: string;
  imageLink: string = environment.API_IMAGE;

  constructor(
    private http: Http,
    private _store: Store<Media>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService) {
      this.channelId = route.snapshot.params['id'];
      this.tagState$ = this._store.select('mediaStore');
      this.userState$ = this._store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.channel = state;
      });
      this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      this.buildEditForm();
  }

  ngOnInit() {
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
    this.modalService.open('editform');
  }

  closePopup() {
    console.log('close form');
    this.modalService.close('editform');
  }

  // Media Popup
  mediaOpenPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
    this.modalService.open('mediaPopup');
  }

  mediaClosePopup() {
    this.modalService.close('mediaPopup');
  }

  submitComment(comment) {
    const send = {
      'content': comment,
      'parent': this.channel['media_detail'].id
    }
    this._store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
  }

}
