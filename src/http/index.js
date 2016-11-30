const express = require('express');
const {graphServer} = require('./middlewares/graph');

/*
* HTTP server class.
*/

exports.HTTP = class HTTP {

  /*
  * Class constructor.
  */

  constructor ({config, graph} = {}) {
    this.config = config;
    this.graph = graph;

    this.app = null;
    this.server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  async listen () {
    if (this.server) return this;

    this.app = express();
    this.app.use(graphServer(this));

    await new Promise((resolve) => {
      let {httpPort, httpHost} = this.config;
      this.server = this.app.listen(httpPort, httpHost, resolve);
    });
  }

  /*
  * Returns a promise which stops the server.
  */

  async close () {
    if (!this.server) return this;

    await new Promise((resolve) => {
      this.server.close(resolve);
      this.server = null;
      this.app = null;
    });
  }

}
