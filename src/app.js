require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');
const validateToken = require('./validateToken');
const errorHandler = require('./errorhandler');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production'
    ? 'tiny'
    : 'dev';

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());
// app.use(validateToken);

app.use(`/bookmarks`, bookmarksRouter);

app.use(errorHandler);

module.exports = app;
