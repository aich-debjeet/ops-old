import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-spotfeed',
  templateUrl: './search-spotfeed.component.html',
  styleUrls: ['./search-spotfeed.component.scss']
})
export class SearchSpotfeedComponent implements OnInit {
  cards = [];
  imageBaseLink: string = environment.API_IMAGE;
  constructor() {
    this.cards = [
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image": this.imageBaseLink + "img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
            ];
     }

  ngOnInit() {
  }

}
