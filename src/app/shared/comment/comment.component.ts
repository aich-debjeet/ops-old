import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { initialMedia, Media } from '../../models/media.model';
import { environment } from './../../../environments/environment';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() mediaId: string;
  @Input() mediaType: string;
  @Input() comments: any;
  @Input() commentCount: any;
  @Input() commentsType = 'media-list'; // media-list or media-popup
  userState$: Observable<Media>;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  userData: any;
  messageText: string = '';
  @Output() submitComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateComment: EventEmitter<any> = new EventEmitter<any>();
  imageLink: string = environment.API_IMAGE;
  comment_post_loading: boolean = false;
  moreComment: boolean = true

  constructor(
    private store: Store<Media>
  ) {
    this.userState$ = store.select('profileTags');
    this.mediaState$ = store.select('mediaStore');

    this.userState$.subscribe((state) => {
      this.userData = state['profile_navigation_details'];
    });

    this.mediaState$.subscribe((state) => {
      this.comment_post_loading = state.comment_post_loading;
    });
  }

  ngOnInit() {
    // this.loadMedia()
  }

  /**
   * Load Comments
   */
  loadMedia() {
    this.moreComment = false;
    const send = {
      'media_id': this.mediaId,
      'commentType': this.mediaType
    }
    this.store.dispatch({ type: ProfileActions.COMMENT_MORE, payload: send });
    return
  }

  /**
   * Submit Comment
   */
  keyDownFunction(mediaId: string) {
    if (this.messageText.trim().length !== 0) {
      const send = {
        'content': this.messageText,
        'commentType': this.mediaType,
        'parent': mediaId
      }
      this.store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
      this.submitComment.emit();
      this.addNewComment();
      this.messageText = '';
      return
    }
  }

  addNewComment() {
    this.store.dispatch({ type: ProfileActions.COMMENT_COUNT_INCREMENT, payload: this.mediaId });
    const commentData = {
      comment: this.messageText,
      isOwner: true,
      ownerImage: this.userData.profileImage,
      ownerName: this.userData.name,
      createdDate: +new Date(),
      postId: this.mediaId
    }

    this.store.dispatch({ type: ProfileActions.COMMENT_POST_LIST, payload: commentData });
  }

  deleteBacend(comment) {
    const send = {
      'id': comment.commentsId,
      'commentType': this.mediaType,
      'parent': this.mediaId
    }

    this.store.dispatch({ type: MediaActions.DELETE_COMMENT, payload: send});
    this.store.dispatch({ type: ProfileActions.COMMENT_POST_DELETE, payload: send});
  }

  onCommentDelete(comment) {
    this.deleteBacend(comment);
    this.store.dispatch({ type: ProfileActions.COMMENT_COUNT_DECREMENT, payload: this.mediaId });
    return
  }

  onCommentEdit(comment, message) {
    if (message === '') {
      this.deleteBacend(comment);
      return
    }

    const send = {
      'id': comment.commentsId,
      'content': message,
      'commentType': this.mediaType,
      'parent': this.mediaId
    }
    this.store.dispatch({ type: MediaActions.UPDATE_COMMENT, payload: send});
  }

}
