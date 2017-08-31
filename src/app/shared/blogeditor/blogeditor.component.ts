import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-blogeditor',
  templateUrl: './blogeditor.component.html',
  styleUrls: ['./blogeditor.component.scss']
})

export class BlogeditorComponent {

  constructor() { }

  getConfig() {
    const config = {
      placeholder: { text: 'Add Text', hideOnClick: false },
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
      buttonLabels: 'fontawesome',
    }

    return config;
  }

}
