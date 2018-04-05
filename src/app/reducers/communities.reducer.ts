import { ActionReducer, Action } from '@ngrx/store';
import { CommunitiesActions } from '../actions/communities.action';


export const CommunitiesReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case CommunitiesActions.COMMUNITY_CREATE:
      return Object.assign({}, state, {

      });

    case CommunitiesActions.COMMUNITY_CREATE_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        community_create_success: true,
      });

    case CommunitiesActions.COMMUNITY_CREATE_FAILED:
      return Object.assign({}, state, {
        success: false
      });


    case CommunitiesActions.COMMUNITY_LIST_SUCCESS:
      return Object.assign({}, state, {
        communityList: payload['SUCCESS']
      });

    default:
      return state;

  }

}
