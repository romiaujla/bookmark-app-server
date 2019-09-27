process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'

require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');

global.expect = expect;
global.request = request;