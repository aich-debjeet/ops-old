import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  baseUrl = environment.API_IMAGE;
  activeTab = 'audition';

  ngOnInit() {}

  // change tab
  switchTabTo(tabId: string) {
    this.activeTab = tabId;
  }

}
