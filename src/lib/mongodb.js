import {
  MongoClient,
  ObjectId
} from 'mongodb';

/*
* Exposing BSON ObjectId.
*/

export {ObjectId};

/*
* Creates a new MongoDB connection.
*/

export function connectToMongo (url) {
  return MongoClient.connect(url);
}
