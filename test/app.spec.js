const app = require('../src/app');
const { PORT } = require('../src/config');

describe(`Bookmark App `, () => {
    it(`GET /bookmarks, runs at ${PORT}`,()=>{
        return request(app)
            .get('/bookmarks')
            .expect(200);
    })
})