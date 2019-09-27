require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8000,
    API_TOKEN: process.env.API_TOKEN,
    DB_URL: process.env.DB_URL || 'postgresql://dunder-mifflin@localhost/bookmarks',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder-mifflin@localhost/bookmarks-test',
};