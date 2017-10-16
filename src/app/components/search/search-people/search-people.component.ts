import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {
cards: any=[];
  constructor() {

    this.cards = [
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      {"button":"FOLLOW","iconImage":"/assets/img/svg/ico_plus_white.svg","image":"/assets/img/avatar2.jpg","heading":"Eljah Fletcher","heading12":"@Elijah","selected":false},
      ];
     }

  ngOnInit() {
  }

}
