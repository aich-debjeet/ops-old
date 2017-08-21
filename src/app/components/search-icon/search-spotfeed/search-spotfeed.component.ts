import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-spotfeed',
  templateUrl: './search-spotfeed.component.html',
  styleUrls: ['./../search-icon.component.scss']
})
export class SearchSpotfeedComponent implements OnInit {
cards: any=[];
  constructor() {
    this.cards = [
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
      {"image":"/assets/img/art1.png","name":"Hypnosis Myth Reality","subheading":"Living in the now use it to Enrich your life","selected":false},
            ];
     }

  ngOnInit() {
  }

}
