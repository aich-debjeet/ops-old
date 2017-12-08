export class ExploreModel {
    spotfeed_for_user: any[];
    spotfeed_recommended: any[];
    spotfeed_categories: any[];
    spotfeed_category?: object;
    spotfeeds: any;
    search_body?: any;
    search_complete?: boolean;
    searching_spotfeeds?: boolean;
}

export const initialExploreTag: ExploreModel = {
    spotfeed_for_user: [],
    spotfeed_recommended: [],
    spotfeed_categories: [],
    spotfeeds: []
}
