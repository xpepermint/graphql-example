'use strict';

var _ = require('..');

var _mongodb = require('../lib/mongodb');

var _config = require('../config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(async () => {
  let mongo = await (0, _mongodb.connectToMongo)(config.mongoUrl);
  let graph = new _.Graph({ config, mongo });
  let http = new _.HTTP({ config, graph });
  await http.listen();
  console.log(`Listening on ${ config.httpHost }:${ config.httpPort }`);
})().catch(err => {
  console.error('ERROR:', err);
});