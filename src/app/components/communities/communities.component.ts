import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  comingsoon: any;
  basePath = environment.API_IMAGE;
  constructor() {

  }

  ngOnInit() {
  }
}
