const {Schema} = require('contextable');

/*
* Root GraphQL resolver.
*/

module.exports = new Schema({

  /*
  * Instance methods.
  */

  instanceMethods: {

    /*
    * Returns users for the provided `ids`.
    */

    async getUsers (args) {
      let {User} = this.$context;
      let data = await User.findAll(args);
      return data.map((d) => new User(d));
    },

    /*
    * Creates a new user.
    */

    async createUser (data) {
      let {User} = this.$context;
      let user = new User(data);
      await user.save();
      return user;
    }

  }
});
