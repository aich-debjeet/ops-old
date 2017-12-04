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
  @Input() mediaType: string;
  @Input() comments: any;
  @Input() commentsType = 'media-list'; // media-list or media-popup
  userState$: Observable<Media>;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  userData: any;
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
      this.userData = state['profile_navigation_details'];
    });
  }

  ngOnInit() {
    // this.loadMedia()
  }

  /**
   * Load Comments
   */
  loadMedia() {
    const send = {
      'media_id': this.mediaId,
      'commentType': this.mediaType
    }
    this.store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: send });
  }

  /**
   * Submit Comment
   */
  keyDownFunction(mediaId: string) {
    if (this.messageText !== null || this.messageText !== '') {
      const send = {
        'content': this.messageText,
        'commentType': this.mediaType,
        'parent': mediaId
      }
      this.store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
      this.submitComment.emit();
      this.addNewComment();
      this.messageText = null;
    }
  }

  addNewComment() {
    const commentCount = this.comments.length
    this.comments.push({
      comment: this.messageText,
      isOwner: true,
      ownerImage: this.userData.profileImage,
      ownerName: this.userData.name,
      createdDate: +new Date()
    })
    this.loadMedia();

    this.store.select('mediaStore')
      .first(commentsData => commentsData['media_comment'].length > commentCount )
      .subscribe( data => {
        console.log('working');
        const comments = data['media_comment'];
        if (comments.length > 0) {
          this.comments = comments
        }
      });
  }

  deleteBacend(comment) {
    const index: number = this.comments.indexOf(comment);
    if (index !== -1) {
      this.comments.splice(index, 1);
      const send = {
        'id': comment.commentsId,
        'commentType': this.mediaType,
        'parent': this.mediaId
      }
      this.store.dispatch({ type: MediaActions.DELETE_COMMENT, payload: send});
    }
  }

  onCommentDelete(comment) {
    this.submitComment.emit('Del');
    this.deleteBacend(comment);
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
