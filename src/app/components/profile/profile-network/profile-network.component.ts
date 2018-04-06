import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-network',
  templateUrl: './profile-network.component.html',
  styleUrls: ['./profile-network.component.scss']
})
export class ProfileNetworkComponent implements OnInit {

  imageBaseUrl = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
