import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { MediaActions } from '../../actions/media.action';
import { Media, initialMedia } from '../../models/media.model';

@Component({
  selector: 'app-my-story',
  templateUrl: './my-story.component.html',
  styleUrls: ['./my-story.component.scss']
})
export class MyStoryComponent implements OnInit, OnChanges {

@Input() currentUser: boolean;
@Input() handle: string;

 baseUrl = environment.API_IMAGE;
 profileState$: any;
 private mediaSub: Subscription;
 mediaState$: Observable<Media>;
 mediaStore = initialMedia;
 storyList: any;
  storyDetails: any;
  getSto = true;

  constructor(
    private _store: Store<any>
  ) {
    this.mediaState$ = this._store.select('mediaStore');
    this.mediaSub = this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      if (state && state['my_story']) {
        this.storyList = state['my_story']['media'];
        this.storyDetails = state['my_story'];
      }
    });
   }
  
   ngOnChanges(changes: SimpleChanges) {
     const handle: SimpleChange = changes.handle;
     if(handle.currentValue !== undefined){
      this._store.dispatch({
        type: MediaActions.GET_MY_STORY, payload: {
          handle: handle.currentValue
        }
      });
     }
  }

  ngOnInit() {
  }

}
