import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-collaborators',
  templateUrl: './widget-collaborators.component.html',
  styleUrls: ['./widget-collaborators.component.scss']
})
export class WidgetCollaboratorsComponent implements OnInit {

  @Input() opportunityId: string;
  @Input() isLoading: boolean;
  @Input() userData: any[];

  constructor() { }

  ngOnInit() {
  }

}
