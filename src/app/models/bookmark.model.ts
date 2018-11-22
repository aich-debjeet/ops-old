export class BookmarkModel {
    loadingBookmarks?: boolean;
    loadedBookmarks?: boolean;
    bookmarks?: any[];
}

export const initialBookmarkState: BookmarkModel = {
    loadingBookmarks: true,
    loadedBookmarks: false,
    bookmarks: []
}
