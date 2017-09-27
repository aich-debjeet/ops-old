import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { initialMedia, Media } from '../../models/media.model';
import { environment } from './../../../environments/environment';

import { MediaActions } from '../../actions/media.action';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() mediaId: string;
  userState$: Observable<Media>;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  userData: any;
  comments: any;
  messageText: string;
  @Output() submitComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateComment: EventEmitter<any> = new EventEmitter<any>();
  imageLink: string = environment.API_IMAGE;

  constructor(
    private store: Store<Media>
  ) {
    this.userState$ = store.select('profileTags');
    this.mediaState$ = store.select('mediaStore');

    this.userState$.subscribe((state) => {
      this.userData = state['profileUser'];
      // console.log(this.userData);
    });

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.comments = this.mediaStore.media_comment
      // console.log(state);
      // this.userData = this.mediaStore.media_detail;
    });
  }

  ngOnInit() {
    // this.loadMedia()
  }

  /**
   * Load Comments
   */
  loadMedia() {
    console.log(this.mediaId);
    this.store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: this.mediaId });
      
  }

  /**
   * Submit Comment
   */
  keyDownFunction(mediaId: string) {
    console.log(mediaId);
    if (this.messageText !== null || this.messageText !== ' ') {
      const send = {
        'content': this.messageText,
        'parent': mediaId
      }
      this.store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
      this.submitComment.emit();
      this.messageText = null;
    }
  }

}
