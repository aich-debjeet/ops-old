import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Modal } from '../../shared/modal-new/Modal';
import { SharedActions } from '../../actions/shared.action';
import { Store } from '@ngrx/store';
import { initialMedia, Media } from '../../models/media.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  providers: [DatePipe]
})
export class CommentListComponent implements OnInit {
  @Input() commentData: any;
  @Output() commentDelete = new EventEmitter();
  @Output() commentEdited = new EventEmitter();
  @Input() commentsListType: string = 'media-list';
  @ViewChild('reportModal') reportModal: Modal;
  imageLink: string = environment.API_IMAGE;
  isEdit: boolean;
  messageText: string;
  dates: any;
  reportId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<Media>,
  ) { }

  ngOnInit() {
    this.messageText = this.commentData.comment;
  }

  onContentEdit() {
    this.isEdit = true;
  }

  onContentSaved(content) {
    this.isEdit = false;
    this.messageText = content
    this.commentEdited.next(content);
  }

  onContentDelete(content) {
    this.commentDelete.next(content);
  }
  navigate() {
    if (this.commentData.isOwner) {
      this.router.navigate([{ outlets: { media: null } }])
      .then(() => this.router.navigate(['/profile/user/']));
    } else {
      this.router.navigate([{ outlets: { media: null } }])
      .then(() => this.router.navigate(['/profile/u/' + this.commentData.ownerUserName]));
   }
  }

  onCancelEdit() {
    this.isEdit = false;
  }

  saveContentUpdate(text: string) {
    this.isEdit = false;
    // const data = {
    //   id: this.mediaId,
    //   description: text
    // }
    // this.store.dispatch({ type: MediaActions.MEDIA_EDIT, payload: data });
  }

  reportModalOpen(id: string) {
    this.reportModal.open();
    this.reportId = id;
    this.store.dispatch({ type: SharedActions.GET_OPTIONS_REPORT, payload: 'comment' });
  }

}
