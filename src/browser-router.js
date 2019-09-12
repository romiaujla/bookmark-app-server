const express = require('express');
const bookmarkRouter = express.Router();
const { bookmarks } = require('./store');
const bodyParser = express.json();
const logger = require('./logger');
const uuid = require('uuid/v4');

bookmarkRouter
    .route('/')
    .get((req, res) => {
        res.send(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        const { title, url, description = '', rating } = req.body;

        if(!title){
            logger.error(`POST /bookmarks, Title was not defined`);
            return res
                .status(404)
                .send(`Title is required`);
        }

        if(!url){
            logger.error(`POST /bookmarks, URL was not defined`);
            return res
                .status(404)
                .send(`URL is required`);
        }

        if(!rating && rating !== 0){
            logger.error(`POST /bookmarks, Rating was not defined`);
            return res
                .status(404)
                .send(`Rating is required`);
        }

        const bookmark = {
            id: uuid(),
            title,
            url,
            description,
            rating
        }

        bookmarks.push(bookmark);

        return res
            .status(201)
            .send(`A bookmarks with id:${bookmark.id} was added`);

    });

bookmarkRouter
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
        
        if(!bookmark){
            return res
                .status(404)
                .send(`Could Not Find Bookmark with id:${id}`);
        }

        res
            .json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.params;
        const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === id);
        
        if(bookmarkIndex === -1){
            return res
                .status(404)
                .send(`Could Not Find Bookmark with id:${id}, which is to be deleted`);
        }

        bookmarks.splice(bookmarkIndex, 1);

        res
            .status(204)
            .end();

    });

module.exports = bookmarkRouter;