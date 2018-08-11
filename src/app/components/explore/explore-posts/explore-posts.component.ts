import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-posts',
  templateUrl: './explore-posts.component.html',
  styleUrls: ['./explore-posts.component.scss']
})
export class ExplorePostsComponent implements OnInit {
  @Input() posts: any;

  constructor() { }

  ngOnInit() {
  }

}
