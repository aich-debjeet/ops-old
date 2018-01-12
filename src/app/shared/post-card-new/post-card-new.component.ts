import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-post-card-new',
  templateUrl: './post-card-new.component.html',
  styleUrls: ['./post-card-new.component.scss']
})
export class PostCardNewComponent implements OnInit {

  baseUrl: string = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
