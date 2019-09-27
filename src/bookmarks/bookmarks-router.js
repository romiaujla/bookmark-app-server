const express = require('express');
const bookmarksRouter = express.Router();
const jsonParser = express.json();
const BookmarksServices = require('./bookmarks-services');
const logger = require('../logger');

bookmarksRouter
    .route('/')
    .get((req, res, next)=>{
        const db = req.app.get('db');
        BookmarksServices.getBookmarks(db)
            .then((bookmarks) => {
                if(!bookmarks){
                    return res
                        .status(404)
                        .send(`Did not find any bookmarks`);
                }
                return res
                    .status(200)
                    .json(bookmarks);
            })
            .catch(next);
    });

module.exports = bookmarksRouter;