const {Graph} = require('..');
const {connectToMongo} = require('../src/lib/mongodb');
const config = require('../config');

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
