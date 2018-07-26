import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-opportunity-application-card',
  templateUrl: './opportunity-application-card.component.html',
  styleUrls: ['./opportunity-application-card.component.scss']
})
export class OpportunityApplicationCardComponent implements OnInit {
  @Input('applicationDetails') applicationDetails: any;
  baseUrl = environment.API_IMAGE;
  @Output() applicationAction: EventEmitter<any> = new EventEmitter<any>();
  disableRemove = false;
  disableReachout = false;

  constructor() { }

  ngOnInit() {
  }

  userAction(action: string) {
    const data = {
      action: action,
      applicationInfo: this.applicationDetails
    };
    if (action === 'remove') {
      this.disableRemove = true;
    } else if (action === 'reachout') {
      this.disableReachout = true;
    }
    this.applicationAction.emit(data);
  }

}
