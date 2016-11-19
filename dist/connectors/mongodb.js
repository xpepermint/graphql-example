'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToMongo = connectToMongo;

var _mongodb = require('mongodb');

/*
* Creates a new MongoDB connection.
*/

function connectToMongo({ url }) {
  return _mongodb.MongoClient.connect(url);
}