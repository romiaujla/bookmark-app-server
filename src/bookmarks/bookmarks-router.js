const express = require('express');
const bookmarksRouter = express.Router();
const jsonParser = express.json();

bookmarksRouter
    .route('/')
    .get((req, res, next)=>{
        res.send(`GET /bookmarks`);
    });

module.exports = bookmarksRouter;