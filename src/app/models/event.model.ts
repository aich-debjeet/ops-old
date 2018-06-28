
export class EventModal {
 event_create_success?: boolean;
 event_id?: any;
 bannerload: any;
 event_list: any;
 event_Loaded: boolean;
 event_updated: boolean;
 event_filter: any;
}

export const initialTagEve: EventModal = {
    bannerload: [],
    event_filter: [],
    event_list: [],
    event_Loaded: false,
    event_updated: false
};
