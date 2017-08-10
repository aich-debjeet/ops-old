import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-share-botton',
  templateUrl: './share-botton.component.html',
  styleUrls: ['./share-botton.component.scss']
})
export class ShareBottonComponent implements OnInit {
  @Input() trip;
  @Output() onClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  toggleFollowBtn(i){
    // this.onClose.emit(i);
    return this.trip[i].follow == true? this.trip[i].follow = false : this.trip[i].follow = true
  }

  tripFollowState() {
    console.log(this.trip.follow);
    
    return this.trip.follow? 'active' : 'inactive';
  }

  

}
