const {Model} = require('rawmodel');
const User = require('./user');

/*
* Root GraphQL resolver.
*/

module.exports = class Root extends Model {

  /*
  * Model constructor.
  */

  constructor ({config, mongo}) {
    super();

    this.config = config; // application configuration
    this.mongo = mongo; // mongodb instance

    this.defineModel(null, User); // defining context-aware model
  }

  /*
  * Returns users for the provided `ids`.
  */

  async getUsers (args) {
    let data = await this.User.findAll(args);
    return data.map((d) => new this.User(d));
  }

  /*
  * Creates a new user.
  */

  async createUser (data) {
    let user = new this.User(data);
    await user.save();
    return user;
  }

};
