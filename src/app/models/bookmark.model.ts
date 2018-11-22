export class Bookmark {
    loadingBookmarks?: boolean;
    loadedBookmarks?: boolean;
    bookmarks?: [];
}

export const initialBookmarkState: Bookmark  = {
    loadingBookmarks: true,
    loadedBookmarks: false,
    bookmarks: []
}
