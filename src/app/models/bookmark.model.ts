export class BookmarkModel {
    deletingBookmark?: boolean;
    deletedBookmark?: boolean;
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
