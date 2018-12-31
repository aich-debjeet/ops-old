import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ProfileActions } from 'app/actions/profile.action';
import { ProfileModal } from 'app/models/profile.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

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
 profSub: Subscription;
 tagState$: Observable<ProfileModal>;
 storyList: any;
  storyDetails: any;
  getSto = true;

  constructor(
    private _store: Store<any>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      console.log(state)
      if (state && state['my_story']) {
        this.storyList = state['my_story']['media'];
        this.storyDetails = state['my_story'];
      }
    });
   }
  
   ngOnChanges(changes: SimpleChanges) {
     console.log(changes);
     const handle: SimpleChange = changes.handle;
     if(handle.currentValue !== undefined){
      this._store.dispatch({
        type: ProfileActions.GET_MY_STORY, payload: {
          handle: handle.currentValue
        }
      });
     }
  }

  ngOnInit() {
    console.log('my story compo')
    console.log(this.currentUser,this.handle)
      // this._store.dispatch({
      //   type: ProfileActions.GET_MY_STORY, payload: {
      //     handle: this.handle
      //   }
      // });
    // this._store.select('profileTags')
    // .first(profile => profile['profile_user_info'])
    // .subscribe(datas => {
    //   if (datas['profile_user_info'].isCurrentUser) {
    //     this._store.dispatch({
    //       type: ProfileActions.GET_MY_STORY, payload: {
    //         handle: datas['profile_navigation_details'].handle
    //       }
    //     });
    //   }
    //   this._store.select('profileTags')
    //     .first(profile => profile['profile_other'].handle)
    //     .subscribe(data => {
    //       console.log('data', data)
    //       this._store.dispatch({
    //         type: ProfileActions.GET_MY_STORY, payload: {
    //           handle: data['profile_other'].handle
    //         }
    //       });
    //     });
    // });
  }

}
