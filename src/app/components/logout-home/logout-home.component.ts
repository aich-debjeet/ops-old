import { Component, OnInit, OnDestroy, Inject  } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-logout-home',
  templateUrl: './logout-home.component.html',
  styleUrls: ['./logout-home.component.scss']
})
export class LogoutHomeComponent implements OnInit, OnDestroy {

  base_image = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
