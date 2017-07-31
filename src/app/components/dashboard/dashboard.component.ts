import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cards: any = [];
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

    // initial cards
    this.cards = [{
      title: 'title 1',
      image: 'http://via.placeholder.com/640x360',
      descirption: '1 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 2',
      image: 'http://via.placeholder.com/640x360',
      descirption: '2 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 3',
      image: 'http://via.placeholder.com/640x360',
      descirption: '3 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 4',
      image: 'http://via.placeholder.com/640x360',
      descirption: '4 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 5',
      image: 'http://via.placeholder.com/640x360',
      descirption: '5 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }];

  }

}
