import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  bottomCards: any=[];
  topCards: any=[];

  constructor() {
    // this.bottomCards[
    //   {},{},{},{},{},{},{},{},
    //
    // ];

    this.bottomCards = [
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
      { name:'Performance', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'TEDxBangalore', textSecnd: 'Unbreakable-2017', paperClip: 'fa fa-paperclip', circle: 'fa fa-circle-o', share: 'fa fa-share-alt', display:'view', marker: 'fa fa-map-marker fa-lg' },
    ];

    this.topCards = [
      { name:'Lust for Life-Album Launch', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'Accenture, Indiranagar', textSecnd: 'Bengaluru',text:'12 k people going', marker: 'fa fa-map-marker fa-lg'},
      { name:'Lust for Life-Album Launch', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'Accenture, Indiranagar', textSecnd: 'Bengaluru',text:'12 k people going', marker: 'fa fa-map-marker fa-lg'},
      { name:'Lust for Life-Album Launch', dateNumber: '25', dateMoYr: 'July,2017', textFirst: 'Accenture, Indiranagar', textSecnd: 'Bengaluru',text:'12 k people going', marker: 'fa fa-map-marker fa-lg'},

    ];
  }

}
