import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

import { TruncatePipe } from '../../pipes/truncate.pipe';
@Component({
  selector: 'app-post-card-search',
  templateUrl: './post-card-search.component.html',
  styleUrls: ['./post-card-search.component.scss']
})
export class PostCardSearchComponent implements OnInit {

  @Input() post: any;
  baseUrl: string = environment.API_IMAGE;
  query: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params;
  })
  }

}
