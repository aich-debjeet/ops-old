import { ActionReducer, Action } from '@ngrx/store';
import { DirectoryActions } from '../actions/directory.action';

export const DirectoryReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

    switch (type) {
        /**
         * Load All directory
         */
        case DirectoryActions.LOAD_DIRECTORY:
            if (payload.offset === 0) {
                return Object.assign({}, state, {
                    dir_list: [],
                    dir_list_loaded: false,
                });
            }
            return Object.assign({}, state, {
                dir_list_loading: true,
                dir_list_loaded: false,
            });

        case DirectoryActions.LOAD_DIRECTORY_SUCCESS:
            const list = payload['profileResponse'];
            const dir_lists = state.dir_list.concat(list)
            return Object.assign({}, state, {
                user_directory_scroll_id: payload['scrollId'],
                dir_list_loading: false,
                dir_list_loaded: true,
                dir_list: dir_lists,
            });

        case DirectoryActions.GET_PROFILE:
            return Object.assign({}, state, {
                getDirectoryProfile: true,
                getDirectoryProfileSuccess: false,
                getDirectoryProfileParams: payload
            });

        case DirectoryActions.GET_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                getDirectoryProfile: false,
                getDirectoryProfileSuccess: true,
                getDirectoryProfileData: payload['SUCCESS']
            });

        case DirectoryActions.GET_PROFILE_FAILED:
            return Object.assign({}, state, {
                getDirectoryProfile: false,
                getDirectoryProfileSuccess: false
            });

        default:
            return state;

    }

}
