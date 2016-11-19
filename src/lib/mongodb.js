import {MongoClient} from 'mongodb';

/*
* Creates a new MongoDB connection.
*/

export function connectToMongo (url) {
  return MongoClient.connect(url);
}
