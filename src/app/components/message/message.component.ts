import { Component, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  navOpen: boolean = false;
  composeMessageOpen: boolean = false;
  messageDisplayOpen: boolean = false;

  constructor(private render: Renderer) { }

  ngOnInit() {
  }

  composeDisplayToggle() {
    if(this.composeMessageOpen) {
      this.composeMessageOpen = false;
    } else {
      this.composeMessageOpen = true;
      //this.messageDisplayOpen = false;
      console.log("its true");
      //this.messageDisplayOpen = true;
    }
  }
  messageDisplayToggle() {
    if(this.messageDisplayOpen) {
       this.messageDisplayOpen = false;
   } else {
     this.composeMessageOpen = false;
     this.messageDisplayOpen = true;
     console.log("its true");
   }
 }

  toggleNav(event:any) {

    event.preventDefault();
    if(this.navOpen) {
      this.navOpen = false;
    } else {
      this.navOpen = true;
    }

  }

}
