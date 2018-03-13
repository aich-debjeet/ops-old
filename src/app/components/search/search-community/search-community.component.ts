import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-community',
  templateUrl: './search-community.component.html',
  styleUrls: ['./search-community.component.scss']
})
export class SearchCommunityComponent implements OnInit {
  imageBaseLink: string = environment.API_IMAGE;
cards: any=[];
  constructor() {
    this.cards = [
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},
      {"imageQuick": this.imageBaseLink + "img/quick3.jpg","imagethumb1": this.imageBaseLink + "img/opro.png","imagethumb2": this.imageBaseLink + "img/avatar2.jpg","imagethumb3": this.imageBaseLink + "img/avatar.png","thumbText":"+ 08 Members","heading":"How to set intentions that energize you","button":"JOIN","selected":false},

            ];
     }

  ngOnInit() {
  }

}
