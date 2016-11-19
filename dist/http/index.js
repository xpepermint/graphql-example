'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graph = require('./middlewares/graph');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* HTTP server class.
*/

class HTTP {

  /*
  * Class constructor.
  */

  constructor({ config, graph } = {}) {
    this.config = config;
    this.graph = graph;

    this.app = null;
    this.server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  async listen() {
    if (this.server) return this;

    this.app = (0, _express2.default)();
    this.app.use((0, _graph.graphServer)(this));

    await new Promise(resolve => {
      let { httpPort, httpHost } = this.config;
      this.server = this.app.listen(httpPort, httpHost, resolve);
    });
  }

  /*
  * Returns a promise which stops the server.
  */

  async close() {
    if (!this.server) return this;

    await new Promise(resolve => {
      this.server.close(resolve);
      this.server = null;
      this.app = null;
    });
  }

}
exports.HTTP = HTTP;