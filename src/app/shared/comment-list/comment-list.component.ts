import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

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
  imageLink: string = environment.API_IMAGE;
  isEdit: boolean;
  messageText: string;
  dates: any;

  constructor() { }

  ngOnInit() {
    this.messageText = this.commentData.comment;
  }

  onContentEdit() {
    this.isEdit = true;
  }

  onContentSaved(content) {
    console.log(this.messageText);
    this.isEdit = false;
    this.commentEdited.next(this.messageText);
  }

  onContentDelete(content) {
    this.commentDelete.next(content);
  }

}
