export class BookmarkModel {
    loadingBookmarks?: boolean;
    loadedBookmarks?: boolean;
    bookmarkData?: any;
}

export const initialBookmarkState: BookmarkModel = {
    loadingBookmarks: true,
    loadedBookmarks: false,
    bookmarkData: { }
}
