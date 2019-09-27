const BOOKMARKS_TABLE = 'bookmarks';

const BookmarksServices = {
    getBookmarks(db){
        return db
            .select('*')
            .from(BOOKMARKS_TABLE);
    },
    getBookmarksById(db, id){
        return db
            .select('*')
            .from(BOOKMARKS_TABLE)
            .where('id', id)
            .first();
    }
}

module.exports = BookmarksServices;