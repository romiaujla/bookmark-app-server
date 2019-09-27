const BOOKMARKS_TABLE = 'bookmarks';

const BookmarksServices = {
    getBookmarks(db){
        return db
            .select('*')
            .from(BOOKMARKS_TABLE);
    }
}