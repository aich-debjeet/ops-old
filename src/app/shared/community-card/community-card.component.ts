import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss']
})
export class CommunityCardComponent implements OnInit {
  @Input() data;
  imageLink: string = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
