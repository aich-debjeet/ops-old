import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-media',
  templateUrl: './portfolio-media.component.html',
  styleUrls: ['./portfolio-media.component.scss']
})
export class PortfolioMediaComponent implements OnInit {

  @Input() portMediaType: string;
  @Input() portMediaDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
