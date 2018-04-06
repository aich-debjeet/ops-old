import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-accepted-requests',
  templateUrl: './profile-accepted-requests.component.html',
  styleUrls: ['./profile-accepted-requests.component.scss']
})
export class ProfileAcceptedRequestsComponent implements OnInit {

  imageBaseUrl = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
