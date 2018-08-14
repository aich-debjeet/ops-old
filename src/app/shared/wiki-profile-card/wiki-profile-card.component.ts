import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wiki-profile-card',
  templateUrl: './wiki-profile-card.component.html',
  styleUrls: ['./wiki-profile-card.component.scss']
})
export class WikiProfileCardComponent implements OnInit {
  @Input() profileDetails;
  defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';

  constructor() { }

  ngOnInit() {
  }

}
