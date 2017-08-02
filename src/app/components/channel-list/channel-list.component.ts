import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
channels: any=[];
  constructor() {

    this.channels = [
      { title: 'title 1', descirption: 'descirption 1', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 2', descirption: 'descirption 2', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 3', descirption: 'descirption 3', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 4', descirption: 'descirption 4', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
      { title: 'title 5', descirption: 'descirption 5', linkRight: 'http://right.com', linkLeft: 'http://right.com'},
    ];

   }

  ngOnInit() {
  }

}
