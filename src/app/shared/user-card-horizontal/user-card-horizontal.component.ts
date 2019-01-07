import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-card-horizontal',
  templateUrl: './user-card-horizontal.component.html',
  styleUrls: ['./user-card-horizontal.component.scss']
})
export class UserCardHorizontalComponent implements OnInit {

  imgBaseUrl = environment.API_IMAGE;

  @Input() handle: string;
  @Input() username: string;
  @Input() profileName: string;
  @Input() profileImage: string;
  @Input() isFollowing: boolean;
  @Input() hideButtons: boolean;

  @Output() followAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  followUserAction(action: string) {
    this.followAction.emit(action);
  }

}
