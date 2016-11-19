import {HTTP, Graph} from '..';
import {connectToMongo} from '../lib/mongodb';
import * as config from '../config';

(async () => {
  let mongo = await connectToMongo(config.mongoUrl);
  let graph = new Graph({config, mongo});
  let http = new HTTP({config, graph});
  await http.listen();
  console.log(`Listening on ${config.httpHost}:${config.httpPort}`);
})()
.catch((err) => {
  console.error('ERROR:', err);
});
