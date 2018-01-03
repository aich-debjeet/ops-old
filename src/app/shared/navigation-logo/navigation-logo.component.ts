import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navigation-logo',
  templateUrl: './navigation-logo.component.html',
  styleUrls: ['./navigation-logo.component.scss']
})
export class NavigationLogoComponent implements OnInit {
  imageBaseLink: string = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
