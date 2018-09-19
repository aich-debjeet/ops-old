import { ActionReducer, Action } from '@ngrx/store';
import { CommunitiesActions } from '../actions/communities.action';


export const CommunitiesReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case CommunitiesActions.COMMUNITY_CREATE:
      return Object.assign({}, state, {
        completed: [],
        community_create_success: false
      });

    case CommunitiesActions.COMMUNITY_CREATE_SUCCESS:
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
        communityList: state.communityList.concat(payload['SUCCESS'].communityResponse),
        communityTags: payload['SUCCESS'].filterList[0],
        community_scrollId: payload['SUCCESS'].scrollId,
        community_loading: false
      });

    case CommunitiesActions.COMMUNITY_LIST:
      if (payload.scrollId === null) {
        return Object.assign({}, state, {
          communityList: [],
          community_loading: true
        });
      }
      return Object.assign({}, state, {
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
          isMember: true,
          memberCount: state.communityDetails ? state.communityDetails.memberCount + 1 : null
        },
        community_ismember_loading: false
      });

    case CommunitiesActions.COMMUNITY_DETAILS:
      return Object.assign({}, state, {
        community_loding: true,
        community_post: [],
        post_loading: true,
        communityDetails: []
      });

    case CommunitiesActions.COMMUNITY_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        communityDetails: payload,
        community_loding: false
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
        post_loading: true
      });

    case CommunitiesActions.COMMUNITY_POST_GET_SUCCESS:
      return Object.assign({}, state, {
        community_post: payload,
        post_loading: false
      });

    case CommunitiesActions.COMMUNITY_POST_GET_FAILED:
      return Object.assign({}, state, {
        post_loading: false
      });

    case CommunitiesActions.COMMUNITY_INVITE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        invite_button: true,
        communityInvitePeople: state.communityInvitePeople.filter(community => community.profileHandle !== payload.SUCCESS),
        communityDetails: {
          ...state.communityDetails,
          memberCount: state.communityDetails ? state.communityDetails.memberCount + 1 : null
        }
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
          isMember: false,
          memberCount: state.communityDetails ? state.communityDetails.memberCount - 1 : null
        },
        community_ismember_loading: false
      });

    case CommunitiesActions.COMMUNITY_UPDATE:
      return Object.assign({}, state, {
        community_update_success: false,
        community_update_loading: true
      });

    case CommunitiesActions.COMMUNITY_UPDATE_SUCCESS:
      const data = payload.data;
      return Object.assign({}, state, {
        community_update_success: true,
        community_update_loading: false,
        communityDetails: {
          ...state.communityDetails,
          access: data.access,
          brief: data.brief,
          title: data.title,
          image: data.image,
          industryList: [data.industryList[0]],
        },
      });

    case CommunitiesActions.COMMUNITY_MEMBER_LIST:
      if (payload.page === 0) {
        return Object.assign({}, state, {
          community_member_list: []
        });
      }
      return state;

    case CommunitiesActions.COMMUNITY_MEMBER_LIST_SUCCESS:
      return Object.assign({}, state, {
        community_member_list: state.community_member_list.concat(payload)
      });

    case CommunitiesActions.COMMUNITY_ADMIN_CHANGE_SUCCESS:
      return Object.assign({}, state, {
        communityDetails: {
          ...state.communityDetails,
          isOwner: false,
          isMember: false
        },
      });


    default:
      return state;

  }

}
