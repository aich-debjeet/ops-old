export class Bookmark {
    loadingBookmarks?: boolean;
    loadedBookmarks?: boolean;
    bookmarks?: any[];
}

export const initialBookmarkState: Bookmark  = {
    loadingBookmarks: true,
    loadedBookmarks: false,
    bookmarks: []
}
