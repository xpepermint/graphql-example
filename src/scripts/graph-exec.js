import {Graph} from '..';
import {connectToMongo} from '../lib/mongodb';
import * as config from '../config';

(async () => {
  let query = process.argv[2];
  let mongo = await connectToMongo(config.mongoUrl);
  let graph = new Graph({config, mongo});
  let data = await graph.exec({query});
  let json = JSON.stringify(data, null, 2);
  console.log(json);
})()
.catch((err) => {
  console.error('ERROR:', err);
});
