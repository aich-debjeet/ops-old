import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  providers: [DatePipe]
})
export class CommentListComponent implements OnInit {
  @Input() commentData: any;
  private imageLink: string = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
