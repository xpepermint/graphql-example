import test from 'ava';
import {Graph} from '../../dist';
import {
  connectToMongo,
  ObjectId
} from '../../dist/lib/mongodb';
import * as config from '../../dist/config';

/*
* Initialization and test hooks.
*/

const graph = new Graph(config);

test.before(async (t) => {
  graph.mongo = await connectToMongo(`${config.mongoUrl}`);
});

test.after(async (t) => {
  graph.mongo.close();
});

/*
* Graph tests.
*/

test('query `getUser` should return a paginated list of users', async (t) => {
  // database initialization
  await graph.mongo.collection('users').remove({});
  await graph.mongo.collection('users').insert([
    {_id: new ObjectId('582f4c7e2d25676224e08f9c'), name: 'Foo'},
    {_id: new ObjectId('582f4d220260a6625228564f'), name: 'Bar'},
    {_id: new ObjectId('582f4d5da7489e626d5db9c6'), name: 'Baz'},
  ]);
  // query definition
  let query = `
    query ($skip: Int, $limit: Int) {
      getUsers(skip: $skip, limit: $limit) { id name }
    }
  `;
  let vars = {
    skip: 1,
    limit: 1
  }
  // query test
  t.deepEqual(await graph.exec({query, vars}), {
    data: {
      getUsers: [
        {id: '582f4d220260a6625228564f', name: 'Bar'}
      ]
    }
  });
});
