import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input() opportunity;
  baseUrl: string;

  constructor() {
    this.baseUrl = environment.API_IMAGE;
  }

  ngOnInit() {
  }

}
