import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { EventActions } from '../../actions/event.action';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { EventModal } from '../../models/event.model';
import { environment } from 'environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-event-widget',
  templateUrl: './event-widget.component.html',
  styleUrls: ['./event-widget.component.scss']
})
export class EventWidgetComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  eventStore$: Observable<EventModal>;
  private eveSub: ISubscription;
  eventState: any;
  eventList: any;
  eventsLoading = true;
  baseUrl = environment.API_IMAGE;

  @Input() currentUser: boolean;

  constructor(
    private _store: Store<any>,
    private profileStore: Store<ProfileModal>,
  ) { 
    this.eventStore$ = this._store.select('eventTags');
    this.eveSub = this.eventStore$.subscribe((state) => {
      this.eventState = state;
      if (state['event_list'] && state.event_loaded === true) {
        this.eventList = state['event_list'];
        this.eventsLoading = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const isUser: SimpleChange = changes.currentUser;
    if(isUser.currentValue !== undefined){
      if(!isUser.currentValue){
        this._store.dispatch({
          type: EventActions.EVENT_SEARCH, payload: {
            scrollId: '',
            searchType: 'recommended',
          }
         });
      } else {
        this._store.dispatch({
          type: EventActions.EVENT_SEARCH, payload: {
            scrollId: '',
            searchType: 'created',
          }
         });
      }
    }
 }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.eveSub.unsubscribe();
  }

}
