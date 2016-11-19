'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceMethods = undefined;

var _contextable = require('contextable');

/*
* Instance methods.
*/

const instanceMethods = exports.instanceMethods = {

  /*
  * Returns users for the provided `ids`.
  */

  async getUsers(args) {
    let { User } = this.$context;
    let data = await User.findAll(args);
    return data.map(d => new User(d));
  },

  /*
  * Creates a new user.
  */

  async createUser(data) {
    let { User } = this.$context;
    let user = new User(data);
    return (await user.save()) ? user : null;
  }

};

/*
* Root model schema.
*/

exports.default = new _contextable.Schema({
  instanceMethods
});