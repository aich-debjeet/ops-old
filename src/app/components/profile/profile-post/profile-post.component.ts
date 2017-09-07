import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { Media, initialMedia  } from '../../../models/media.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';
import { SharedActions } from '../../../actions/shared.action';
import { environment } from '../../../../environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  mediaState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  userMedia = initialTag;
  mediaDetails = initialMedia;

  constructor(
    private http: Http,
    private modalService: ModalService,
    private _store: Store<Media>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.mediaState$ = this._store.select('mediaStore');

    this.tagState$.subscribe((state) => {
      console.log(state);
      this.userMedia = state;
    });

    this.mediaState$.subscribe((state) => {
      this.mediaDetails = state;
    });


    this._store.dispatch({ type: ProfileActions.LOAD_USER_MEDIA });

  }

  ngOnInit() {
  }

  editPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
    this.modalService.open('mediaPopup');
  }

  closePopup() {
    this.modalService.close('mediaPopup');
  }

  submitComment(value) {
    if (value !== undefined &&  value !== null && value !== ' ') {
      const body = {
        'content': value,
        'parent': this.mediaDetails['media_detail'].id
      }
      this._store.dispatch({ type: MediaActions.POST_COMMENT, payload: body});
      // this.mediaState$.subscribe(
      //   data => {
      //     console.log(data.media_post_success);
      //     if (data. media_post_success === true) {
      //       this.mediaStore.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: this.mediaDetails['media_detail'].id });
      //     }
      //   }
      // )
    }
  }

}
