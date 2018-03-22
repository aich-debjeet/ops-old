import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { CommunitiesService } from '../services/communities.service';
import { CommunitiesActions } from '../actions/communities.action';

@Injectable()
export class CommunitiesEffect {

//   @Effect()
//   loadChannels$ = this.actions$
//     .ofType(CommunitiesActions.LOAD_CHANNELS)
//     .map(toPayload)
//     .switchMap((payload) => this.api.getChannels()
//       .map(res => ({ type:  CommunitiesActions.LOAD_CHANNELS_SUCCESS, payload: res }))
//       .catch((res) => Observable.of({ type: HomeActions.LOAD_CHANNELS_FAILED, payload: res }))
//     );

    constructor(
    private actions$: Actions,
    private communitiesService: CommunitiesService,
  ) {}
}
