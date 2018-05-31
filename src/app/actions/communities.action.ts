import { Action } from '@ngrx/store';

export class CommunitiesActions {
    static COMMUNITY_CREATE = 'COMMUNITY_CREATE';
    static COMMUNITY_CREATE_SUCCESS = 'COMMUNITY_CREATE_SUCCESS';
    static COMMUNITY_CREATE_FAILED = 'COMMUNITY_CREATE_FAILED';

    static COMMUNITY_LIST = 'COMMUNITY_LIST';
    static COMMUNITY_LIST_SUCCESS = 'COMMUNITY_LIST_SUCCESS';
    static COMMUNITY_LIST_FAILED = 'COMMUNITY_LIST_FAILED';

    static COMMUNITY_JOIN = 'COMMUNITY_JOIN';
    static COMMUNITY_JOIN_SUCCESS = 'COMMUNITY_JOIN_SUCCESS';
    static COMMUNITY_JOIN_FAILED = 'COMMUNITY_JOIN_FAILED';

    static COMMUNITY_DETAILS = 'COMMUNITY_DETAILS';
    static COMMUNITY_DETAILS_SUCCESS = 'COMMUNITY_DETAILS_SUCCESS';
    static COMMUNITY_DETAILS_FAILED = 'COMMUNITY_DETAILS_FAILED';

    static COMMUNITY_INVITE_PEOPLE_LIST = 'COMMUNITY_INVITE_PEOPLE_LIST';
    static COMMUNITY_INVITE_PEOPLE_LIST_SUCCESS = 'COMMUNITY_INVITE_PEOPLE_LIST_SUCCESS';
    static COMMUNITY_INVITE_PEOPLE_LIST_FAILED = 'COMMUNITY_INVITE_PEOPLE_LIST_FAILED';

    static COMMUNITY_INVITE_PEOPLE = 'COMMUNITY_INVITE_PEOPLE';
    static COMMUNITY_INVITE_PEOPLE_SUCCESS = 'COMMUNITY_INVITE_PEOPLE_SUCCESS';
    static COMMUNITY_INVITE_PEOPLE_FAILED = 'COMMUNITY_INVITE_PEOPLE_FAILED';

    static COMMUNITY_RELATED = 'COMMUNITY_RELATED';
    static COMMUNITY_RELATED_SUCCESS = 'COMMUNITY_RELATED_SUCCESS';
    static COMMUNITY_RELATED_FAILED = 'COMMUNITY_RELATED_FAILED';

    static COMMUNITY_UNJOIN = 'COMMUNITY_UNJOIN';
    static COMMUNITY_UNJOIN_SUCCESS = 'COMMUNITY_UNJOIN_SUCCESS';
    static COMMUNITY_UNJOIN_FAILED = 'COMMUNITY_UNJOIN_FAILED';

    static COMMUNITY_POST_GET = 'COMMUNITY_POST_GET';
    static COMMUNITY_POST_GET_SUCCESS = 'COMMUNITY_POST_GET_SUCCESS';
    static COMMUNITY_POST_GET_FAILED = 'COMMUNITY_POST_GET_FAILED';

    static COMMUNITY_DELETE = 'COMMUNITY_DELETE';
    static COMMUNITY_DELETE_SUCCESS = 'COMMUNITY_DELETE_SUCCESS';
    static COMMUNITY_DELETE_FAILED = 'COMMUNITY_DELETE_FAILED';

    static COMMUNITY_UPDATE = 'COMMUNITY_UPDATE';
    static COMMUNITY_UPDATE_SUCCESS = 'COMMUNITY_UPDATE_SUCCESS';
    static COMMUNITY_UPDATE_FAILED = 'COMMUNITY_UPDATE_FAILED';

}
