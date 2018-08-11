import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-profiles',
  templateUrl: './explore-profiles.component.html',
  styleUrls: ['./explore-profiles.component.scss']
})
export class ExploreProfilesComponent implements OnInit {
  @Input() profiles: any;

  constructor() { }

  ngOnInit() {
  }

}
