import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-similar-card',
  templateUrl: './opportunity-similar-card.component.html',
  styleUrls: ['./opportunity-similar-card.component.scss']
})
export class OpportunitySimilarCardComponent implements OnInit {

  @Input() oppDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
