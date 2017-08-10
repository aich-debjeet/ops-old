import { Component, Renderer } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  selectedView: string = '';

  // user action to toogle views
  toggleView(tab: any, userHandle: any) {

    // toggle view
    this.selectedView = tab;

    // trigger actions
    if(this.selectedView == 'readMessage') {

      // load user message
      console.log(userHandle);

    }

  }

}
