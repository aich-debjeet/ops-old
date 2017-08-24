import { Component, OnInit } from '@angular/core';
import { TAB_COMPONENTS  } from '../../shared/tabs/tabset';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  providers: [ TAB_COMPONENTS ],
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
