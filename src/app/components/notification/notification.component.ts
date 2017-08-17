import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  dropDownOpen : boolean = false;
  messageIconOpen : boolean = false;
  notificationOpen : boolean = false;
  searchBarDisplay : boolean = false;
  constructor() { }

  ngOnInit() {
  }
    toggleNav(event:any) {
    event.preventDefault();
    if(this.dropDownOpen) {
      this.dropDownOpen = false;
    } else {
      this.dropDownOpen = true;
      this.messageIconOpen = false;
      this.notificationOpen = false;
      this.searchBarDisplay = false;
    }
  }
  toggleNav1(event:any) {
    event.preventDefault();
    if(this.messageIconOpen) {
      this.messageIconOpen = false;
    } else {
      this.messageIconOpen = true;
      this.dropDownOpen = false;
      this.notificationOpen = false;
      this.searchBarDisplay = false;
    }
  }
  toggleNav2(event:any) {
    event.preventDefault();
    if(this.notificationOpen) {
      this.notificationOpen = false;
    } else {
      this.notificationOpen = true;
      this.searchBarDisplay = false;
      this.dropDownOpen = false;
      this.messageIconOpen = false;
    }
  }
  searchBar()
  {
    if (this.searchBarDisplay) {
      this.searchBarDisplay=false;
    }
    else {
      this.searchBarDisplay=true;
      this.notificationOpen=false;
      this.dropDownOpen=false;
      this.messageIconOpen=false;
    }
  }
}
