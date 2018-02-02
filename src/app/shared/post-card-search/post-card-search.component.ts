import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-post-card-search',
  templateUrl: './post-card-search.component.html',
  styleUrls: ['./post-card-search.component.scss']
})
export class PostCardSearchComponent implements OnInit {

  @Input() post: any;
  baseUrl: string = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
