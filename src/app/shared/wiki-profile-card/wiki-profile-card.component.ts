import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wiki-profile-card',
  templateUrl: './wiki-profile-card.component.html',
  styleUrls: ['./wiki-profile-card.component.scss']
})
export class WikiProfileCardComponent implements OnInit {
  @Input() profileDetails;

  constructor() { }

  ngOnInit() {
  }

}
