import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { initialMedia, Media } from '../../models/media.model';
import { environment } from './../../../environments/environment';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  @Input() mediaId: string;
  @Input() mediaType: string;
  @Input() comments: any;
  @Input() userData: any;
  @Input() commentCount: any;
  @Input() commentsType = 'media-list'; // media-list or media-popup
  userState$: Observable<Media>;
  // mediaState$: Observable<Media>;
  // mediaStore = initialMedia;
  messageText: string = '';
  @Output() submitComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateComment: EventEmitter<any> = new EventEmitter<any>();
  imageLink: string = environment.API_IMAGE;
  // comment_post_loading: boolean = false;

  constructor(
    private store: Store<Media>
  ) {
    // this.mediaState$ = store.select('mediaStore');
    // this.subscription = this.mediaState$.subscribe((state) => {
    //   this.comment_post_loading = state.comment_post_loading;
    // });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  /**
   * Load Comments
   */
  loadMedia() {
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
  postComment(form: NgForm) {
    if (form.value.comment.trim().length !== 0) {
      const send = {
        'content': form.value.comment,
        'commentType': this.mediaType,
        'parent': this.mediaId
      }
      this.store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
      this.submitComment.emit();
      this.store.select('mediaStore')
        .first(media => media['media_post_success'] === true)
        .subscribe( data => {
          this.addNewComment(data['current_comment']);
        });
      form.reset();
      return
     }
  }

  addNewComment(comment) {
    this.store.dispatch({ type: ProfileActions.COMMENT_COUNT_INCREMENT, payload: this.mediaId });
    this.store.dispatch({ type: ProfileActions.COMMENT_POST_LIST, payload: comment });
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
