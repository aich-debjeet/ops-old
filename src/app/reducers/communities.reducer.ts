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
        communityList: payload['SUCCESS'],
        community_loading: false
      });

    case CommunitiesActions.COMMUNITY_LIST:
      return Object.assign({}, state, {
        communityList: [],
        community_loading: true
      });

    case CommunitiesActions.COMMUNITY_JOIN:
      return Object.assign({}, state, {
        community_ismember_loading: true
      });

    case CommunitiesActions.COMMUNITY_JOIN_SUCCESS:
      return Object.assign({}, state, {
        communityList: state.communityList ? state.communityList.filter(community => community.communityId !== payload.communityId) : [],
        communityDetails: {
          ...state.communityDetails,
          isMember: true
        },
        community_ismember_loading: false
      });

    case CommunitiesActions.COMMUNITY_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        communityDetails: payload
      });

    case CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        communityInvitePeople: payload
      });

    case CommunitiesActions.COMMUNITY_RELATED_SUCCESS:
      return Object.assign({}, state, {
        communityRelated: payload
      });

    case CommunitiesActions.COMMUNITY_POST_GET:
      return Object.assign({}, state, {
        community_post: [],
        post_loding: true
      });

    case CommunitiesActions.COMMUNITY_POST_GET_SUCCESS:
      return Object.assign({}, state, {
        community_post: payload,
        post_loding: false
      });

    case CommunitiesActions.COMMUNITY_POST_GET_FAILED:
      return Object.assign({}, state, {
        post_loding: false
      });

    case CommunitiesActions.COMMUNITY_INVITE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        invite_button: true,
        communityInvitePeople: state.communityInvitePeople.filter(community => community.profileHandle !== payload.SUCCESS)
      });

    case CommunitiesActions.COMMUNITY_INVITE_PEOPLE:
      return Object.assign({}, state, {
        invite_button: false,
      });

    case CommunitiesActions.COMMUNITY_INVITE_PEOPLE_FAILED:
      return Object.assign({}, state, {
        invite_button: true,
      });

    case CommunitiesActions.COMMUNITY_DELETE:
      return Object.assign({}, state, {
        communnity_delete: false,
      });

    case CommunitiesActions.COMMUNITY_DELETE_SUCCESS:
      return Object.assign({}, state, {
        communnity_delete: true,
      });

    case CommunitiesActions.COMMUNITY_UNJOIN:
      return Object.assign({}, state, {
        community_ismember_loading: true
      });

    case CommunitiesActions.COMMUNITY_UNJOIN_SUCCESS:
      return Object.assign({}, state, {
        communityDetails: {
          ...state.communityDetails,
          isMember: false
        },
        community_ismember_loading: false
      });

    default:
      return state;

  }

}
