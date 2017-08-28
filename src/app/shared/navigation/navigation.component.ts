import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  topNav = {
    status: {
      open: false
    },
    channel: {
      open: false
    },
    search: {
      open: false
    },
    notification: {
      open: false
    },
    message: {
      open: false
    },
    profile: {
      open: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

  toggleNav(elem: string) {
    console.log(this.topNav[elem]);
    if (this.topNav[elem].open === true) {
      this.topNav[elem].open = false;
    } else {
      this.topNav[elem].open = true;
    }
  }

}
