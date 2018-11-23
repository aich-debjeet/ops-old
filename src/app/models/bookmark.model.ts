export class BookmarkModel {
    loadingBookmarks?: boolean;
    loadedBookmarks?: boolean;
    bookmarkType?: string;
    bookmarks?: any[];
}

export const initialBookmarkState: BookmarkModel = {
    loadingBookmarks: true,
    loadedBookmarks: false,
    bookmarks: []
}
