import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-blogeditor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss']
})

export class BlogEditorComponent {
  chosenChannel: any = 0;
  @Input() userChannels;
  isActive = false;
  constructor() {}

  getConfig() {
    const config = {
      placeholder: { text: 'Add Text', hideOnClick: false },
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
      buttonLabels: 'fontawesome',
    }

    return config;
  }

  /**
   * on Channel Selection
   */
  onChannelSelection(channel: any) {
    this.chosenChannel = channel;
  }
}
