'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectId = undefined;
exports.connectToMongo = connectToMongo;

var _mongodb = require('mongodb');

/*
* Exposing BSON ObjectId.
*/

exports.ObjectId = _mongodb.ObjectId;

/*
* Creates a new MongoDB connection.
*/

function connectToMongo(url) {
  return _mongodb.MongoClient.connect(url);
}