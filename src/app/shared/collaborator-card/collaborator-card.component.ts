import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.scss']
})
export class CollaboratorCardComponent implements OnInit {

  @Input() user: any;
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
