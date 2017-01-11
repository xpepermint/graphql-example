const {Model} = require('rawmodel');
const {ObjectId} = require('mongodb');

/*
* User model schema.
*/

module.exports = class User extends Model {

  /*
  * Model constructor.
  */

  constructor (data, options) {
    super(null, options);

    this.defineType('ObjectId', function (value) {
      return new ObjectId(value)
    });

    this.defineField('_id', {
      type: 'ObjectId'
    });
    this.defineField('name', {
      type: 'String',
      validate: [
        {
          validator: 'presence',
          message: 'is required'
        }
      ]
    });

    this.populate(data);
  }

  /*
  * Virtual getter which returns the `_id` field.
  */

  get id () {
    return this._id;
  }

  /*
  * Virtual getter which returns a list of known errors.
  */

  get errors () {
    return this.collectErrors();
  }

  /*
  * Create new or updates existing user in a database.
  */

  async save () {
    let collection = this.context.mongo.collection('users');

    try {
      await this.validate();
      if (this._id) {
        await collection.updateOne({_id: this._id}, this, {upsert: true});
      }
      else {
        await collection.insertOne(this); // `_id` property is automatically set
      }
      return true;
    }
    catch (e) {
      await this.handle(e);
      return false;
    }
  }

  /*
  * Returns a list of users.
  */

  static async findAll ({skip = 0, limit = 100} = {}) {
    let collection = this.context.mongo.collection('users');

    if (skip < 0) skip = 0;
    if (limit > 100) limit = 100;

    return await collection.find().limit(limit).skip(skip).toArray();
  }

};
