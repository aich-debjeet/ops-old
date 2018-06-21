import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment.dev2';

@Component({
  selector: 'app-portfolio-media',
  templateUrl: './portfolio-media.component.html',
  styleUrls: ['./portfolio-media.component.scss']
})
export class PortfolioMediaComponent implements OnInit {

  @Input() portMediaDetails: any;
  baseImageUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
