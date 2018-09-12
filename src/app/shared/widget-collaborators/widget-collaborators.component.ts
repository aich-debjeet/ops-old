import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-collaborators',
  templateUrl: './widget-collaborators.component.html',
  styleUrls: ['./widget-collaborators.component.scss']
})
export class WidgetCollaboratorsComponent implements OnInit {

  @Input() opportunityId: string;
  isLoading = true;

  constructor() { }

  ngOnInit() {
  }

}
