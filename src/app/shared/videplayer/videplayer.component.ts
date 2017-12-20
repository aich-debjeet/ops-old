import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.scss']
})
export class VideplayerComponent implements OnInit {
  @Input() src: any;
  @Input() play: boolean = false;
  source: any;
  constructor() {
    this.source = this.src;
  }

  ngOnInit() {
  }

}
