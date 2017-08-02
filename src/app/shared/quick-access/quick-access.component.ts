import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.css']
})
export class QuickAccessComponent {

  quickAccess: any = [];

  constructor() {

    // initial cards
    this.quickAccess = [{
      title: 'Card title',
      subTitle: 'Card subtitle',
      link: 'Card link',
    }, {
      title: 'Card title',
      subTitle: 'Card subtitle',
      link: 'Card link',
    }, {
      title: 'Card title',
      subTitle: 'Card subtitle',
      link: 'Card link',
    }];

  }

}
