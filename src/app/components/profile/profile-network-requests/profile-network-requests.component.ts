import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-network-requests',
  templateUrl: './profile-network-requests.component.html',
  styleUrls: ['./profile-network-requests.component.scss']
})
export class ProfileNetworkRequestsComponent implements OnInit {

  imageBaseUrl = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
