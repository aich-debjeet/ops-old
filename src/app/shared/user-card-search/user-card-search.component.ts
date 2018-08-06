import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-card-search',
  templateUrl: './user-card-search.component.html',
  styleUrls: ['./user-card-search.component.scss']
})
export class UserCardSearchComponent implements OnInit {
  @Input() artist;
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
