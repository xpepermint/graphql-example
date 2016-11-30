const {MongoClient, ObjectId} = require('mongodb');

/*
* Exposing BSON ObjectId.
*/

exports.ObjectId = ObjectId;

/*
* Creates a new MongoDB connection.
*/

exports.connectToMongo = function (url) {
  return MongoClient.connect(url);
}
