import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
cards: any=[];
channels: any=[];
cardsArtist: any=[];
  constructor() {
    this.cards = [
      {"id":1,"title":"Card Title 1","image":"http://via.placeholder.com/350x150","cardText":"Some quick example text to build on the card title","cardText1":"Popular","selected":false},
      {"id":2,"title":"Card Title 2","image":"http://via.placeholder.com/350x150","cardText":"Some quick example text to build on the card title","cardText1":"Stuff picked by u","selected":false},
      {"id":3,"title":"Card Title 3","image":"http://via.placeholder.com/350x150","cardText":"Some quick example text to build on the card title","cardText1":"Featured Collectrion","selected":false},
      {"id":4,"title":"Card Title 4","image":"http://via.placeholder.com/350x150","cardText":"Some quick example text to build on the card title","cardText1":"Contemporary Art","selected":false},
      ];

    this.cardsArtist = [
      {"id":1,"title":"Anna Doe","image":"https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg","btnBtnPrimary":"Follow","faFaQuoteLeft":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci","selected":false},
      {"id":2,"title":"Leo Webster","image":"https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg","btnBtnPrimary":"Follow","faFaQuoteLeft":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci","selected":false},
      {"id":3,"title":"Ethan Munoz","image":"https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg","btnBtnPrimary":"Follow","faFaQuoteLeft":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci","selected":false},
      {"id":4,"title":"Bret Barber","image":"https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg","btnBtnPrimary":"Follow","faFaQuoteLeft":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci","selected":false},
    ];

    this.channels = [
      { title: 'title 1', descirption: 'descirption 1', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 2', descirption: 'descirption 2', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 3', descirption: 'descirption 3', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 4', descirption: 'descirption 4', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 5', descirption: 'descirption 5', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
    ];

   }

  ngOnInit() {
  }

}
