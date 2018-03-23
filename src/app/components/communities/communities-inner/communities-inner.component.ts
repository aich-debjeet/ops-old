import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-communities-inner',
  templateUrl: './communities-inner.component.html',
  styleUrls: ['./communities-inner.component.scss']
})
export class CommunitiesInnerComponent implements OnInit {
  basePath = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {
  }

}
