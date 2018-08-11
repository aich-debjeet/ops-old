export class ExploreModel {
    spotfeed_for_user?: any[];
    spotfeed_recommended?: any[];
    categorised_spotfeeds?: any[];
    spotfeed_category?: object;
    explore_spotfeeds?: any;
    search_body?: any;
    search_complete?: boolean;
    searching_spotfeeds?: boolean;

    explorePosts?: any[];
    exploreChannels?: any[];
    exploreProfiles?: any[];
}

export const initialExploreTag: ExploreModel = {
    // spotfeed_for_user: [],
    // spotfeed_recommended: [],
    // categorised_spotfeeds: [],
    // explore_spotfeeds: []
    exploreChannels: [],
    exploreProfiles: [],
    explorePosts: []
}
