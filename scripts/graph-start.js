const {HTTP, Graph} = require('..');
const {connectToMongo} = require('../src/lib/mongodb');
const config = require('../config');

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
