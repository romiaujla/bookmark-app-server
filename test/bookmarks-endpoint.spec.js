const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixture');
const BOOKMARKS_TABLE = 'bookmarks';
const { TEST_DB_URL } = require('../src/config');
const knex = require('knex');

describe(`Bookmarks Endpoints`, ()=>{
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

    describe(`GET /bookmarks `, ()=>{
        context(`Given that ${BOOKMARKS_TABLE} has data`, ()=>{
            
            const testBookmarks = makeBookmarksArray();

            beforeEach(`Add test data to tables`, ()=>{
                return db
                    .into(BOOKMARKS_TABLE)
                    .insert(testBookmarks);
            })

            it(`Returns all the bookmarks`, ()=>{
                return request(app)
                    .get('/bookmarks')
                    .expect(200, testBookmarks);
            });
        });

        context(`Given that ${BOOKMARKS_TABLE} table has no data`, ()=>{
            it(`Return status 200 with an empty array not found`, ()=>{
                return request(app)
                    .get(`/bookmarks`)
                    .expect(200, `No Bookmarks in database`);
            });
        });
    });

    describe(`\nGET /bookmarks/:bookmarksId`, ()=>{
        context(`Given the ${BOOKMARKS_TABLE} table has data `, ()=>{
            const testBookmarks = makeBookmarksArray();

            beforeEach(`adding test data to the ${BOOKMARKS_TABLE} table`, ()=>{
                return db
                    .into(BOOKMARKS_TABLE)
                    .insert(testBookmarks);
            });

            it(`Returns the correct bookmark on search by id`, ()=>{
                const id = 2;
                const expectedBookmark = testBookmarks[id-1];
                return request(app)
                    .get(`/bookmarks/${id}`)
                    .then(response => response.body)
                    .then((actualBookmark) => {
                        expect(actualBookmark).to.eql({
                            id: expectedBookmark.id,
                            title: expectedBookmark.title,
                            url: expectedBookmark.url,
                            description: expectedBookmark.description,
                            rating: expectedBookmark.rating
                        })
                    });
            })
        });

        context(`Given the ${BOOKMARKS_TABLE} table has no data `, ()=>{
            it(`Returns item not found with a status code of 404`, ()=>{
                const id = 23;
                return request(app)
                    .get(`/bookmarks/${id}`)
                    .expect(404, `Bookmark with id:${id} could not be found`)
            })
        });
    })

})