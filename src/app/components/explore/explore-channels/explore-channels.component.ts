import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-channels',
  templateUrl: './explore-channels.component.html',
  styleUrls: ['./explore-channels.component.scss']
})
export class ExploreChannelsComponent implements OnInit {
  @Input() channels: any;

  constructor() { }

  ngOnInit() {
  }

}
