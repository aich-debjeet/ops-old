import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

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
  imageLink: string = environment.API_IMAGE;
  isEdit: boolean;
  messageText: string;
  dates: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.messageText = this.commentData.comment;
  }

  onContentEdit() {
    this.isEdit = true;
  }

  onContentSaved(content) {
    //console.log('content', content)
    //console.log(this.messageText)
    this.isEdit = false;
    this.commentEdited.next(this.messageText);
  }

  onContentDelete(content) {
    this.commentDelete.next(content);
  }
  navigate() {
    if (this.commentData.isOwner) {
      this.router.navigate([{ outlets: { media: null } }])
      .then(() => this.router.navigate(['/profile/user/']));
    }
    else this.router.navigate([{ outlets: { media: null } }])
    .then(() => this.router.navigate(['/profile/u/' + this.commentData.ownerUserName]));

  }

}
