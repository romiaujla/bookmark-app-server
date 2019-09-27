const BookmarksServices = require('../src/bookmarks/bookmarks-services');
const knex = require('knex');
const { TEST_DB_URL } = require('../src/config');
const BOOKMARKS_TABLE = 'bookmarks';
const { makeBookmarksArray } = require('./bookmarks-fixtures');
const app = require('../src/app');

describe(`Bookmarks Services`, ()=>{

    let db;

    before(`Create knex instance`, ()=>{
        db = knex({
            client: 'pg',
            connection: TEST_DB_URL
        });
        app.set('db', db);
    });

    after(`Truncate the connection`, ()=>{
        return db.destroy();
    });

    before(`Clean the tables`, ()=>{
        return db(BOOKMARKS_TABLE).truncate();
    });

    afterEach(`Clean the table`, ()=>{
        return db(BOOKMARKS_TABLE).truncate();
    });

    context(`Given the ${BOOKMARKS_TABLE} table has data`, ()=>{

        const testBookmarks = makeBookmarksArray();

        beforeEach(`Add data to the test table`, ()=>{
            return db
                .into(BOOKMARKS_TABLE)
                .insert(testBookmarks);
        })

        it(`getAllBookmarks() resolves by returning all bookmarks`, ()=>{
            return BookmarksServices.getAllBookmarks(db)
                .then((result) => {
                    expect(result).to.be.an('array');
                    expect(result.length).to.be.eql(testBookmarks.length);
                    expect(result).to.deep.eql()
                });
        });

        it(`getById() resolves and returns the requested bookmark`, ()=>{
            const id = 2;
            const expectedBookmark = testBookmarks[id-1];
            return BookmarksServices.getById(db, id)
                .then((result) => {
                    expect(result).to.eql({
                        id: expectedBookmark.id,
                        title: expectedBookmark.title,
                        url: expectedBookmark.url,
                        description: expectedBookmark.description,
                        rating: expectedBookmark.rating
                    })
                })
        })

    });

    context(`Given the ${BOOKMARKS_TABLE} table has no data `, ()=>{

        it(`getAllBookmarks() resolves an empty table and returns an empty array`, ()=>{
            return BookmarksServices.getAllBookmarks(db)
                .then((result) => {
                    expect(result).to.eql([]);
                })
        });

        it(`getById() resolves and returns an empty array`, ()=>{
            const id = 2;
            return BookmarksServices.getById(db, id)
                .then((result)=>{
                    expect(result).to.eql(undefined);
                })
        })

        it(`insertBookmark() adds a new bookmark and gives it an id`, ()=>{
            const newBookmark = {
                title: `New Bookmark`,
                url: `www.testbookmark.com`,
                description: `Testing to see if it gets added with a new id`,
                rating: "3.2"
            }
            return BookmarksServices.insertBookmark(db, newBookmark)
                .then((actual) => {
                    expect(actual).to.eql({
                        id: 1,
                        title: newBookmark.title,
                        url: newBookmark.url,
                        description: newBookmark.description,
                        rating: newBookmark.rating
                    })
                })
        })

    })
})