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
                if(bookmarks.length === 0){
                    return res
                        .status(200)
                        .send(`No Bookmarks in database`);
                }
                return res
                    .status(200)
                    .json(bookmarks);
            })
            .catch(next);
    });

bookmarksRouter
    .route('/:bookmarkId')
    .get((req, res, next) => {
        const db = req.app.get('db');
        const { bookmarkId } = req.params;
        BookmarksServices.getBookmarksById(db, bookmarkId)
            .then((bookmark) => {
                if(!bookmark){
                    return res
                        .status(404)
                        .send(`Bookmark with id:${bookmarkId} could not be found`);
                }
                return res
                    .status(200)
                    .json(bookmark);
            })
            .catch(next);
    })
module.exports = bookmarksRouter;