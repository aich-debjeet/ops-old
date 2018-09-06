import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-card-search',
  templateUrl: './user-card-search.component.html',
  styleUrls: ['./user-card-search.component.scss']
})
export class UserCardSearchComponent implements OnInit {
  @Input() artist;
  @Input() ownerHandle;
  @Output() followActions: EventEmitter<any> = new EventEmitter<any>();
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    const data = {
      action: 'follow',
      userHandle: user.handle
    };
    this.followActions.emit(data);
    user.extra.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    const data = {
      action: 'unfollow',
      userHandle: user.handle
    };
    this.followActions.emit(data);
    user.extra.isFollowing = false;
  }

}
