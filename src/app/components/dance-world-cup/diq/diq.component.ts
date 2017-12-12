import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diq',
  templateUrl: './diq.component.html',
  styleUrls: ['./diq.component.scss']
})
export class DiqComponent implements OnInit {
  navItem = '';
  activeTab = 'tab-1';
  constructor() { }

  ngOnInit() {
  }

  tabChange(tabId: string) {
    this.activeTab = tabId;
  }

}
