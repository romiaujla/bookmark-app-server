const BookmarksServices = require('../src/bookmarks/bookmarks-services');
const knex = require('knex');
const { TEST_DB_URL } = require('../src/config');
const BOOKMARKS_TABLE = 'bookmarks';

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
        
    })
})