import {Schema} from 'contextable';

/*
* Instance methods.
*/

export const instanceMethods = {

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

};

/*
* Root model schema.
*/

export default new Schema({
  instanceMethods
});
