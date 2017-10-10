import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// action
import { NotificationActions } from './../../actions/notification.action';
import { Notification } from './../../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationsState$: Observable<Notification>;

  constructor(
    private store: Store<Notification>
  ) {

    // loading notifications
    this.store.dispatch({
      type: NotificationActions.LOAD_NOTIFICATIONS,
      payload: null
    });

    this.notificationsState$ = this.store.select('notificationTags');

    // observe the store value
    this.notificationsState$.subscribe((state) => {
      console.log(state);
    });
  }

  ngOnInit() { }

}
