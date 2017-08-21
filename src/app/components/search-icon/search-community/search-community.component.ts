import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-community',
  templateUrl: './search-community.component.html',
  styleUrls: ['./../search-icon.component.scss']
})
export class SearchCommunityComponent implements OnInit {
cards: any=[];
  constructor() {
    this.cards = [
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick":"/assets/img/quick3.jpg","imagethumb1":"/assets/img/opro.png","imagethumb2":"/assets/img/avatar2.jpg","imagethumb3":"/assets/img/avatar.jpg","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},

            ];
     }

  ngOnInit() {
  }

}
