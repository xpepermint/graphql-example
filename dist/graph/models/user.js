'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classMethods = exports.instanceMethods = exports.instanceVirtuals = exports.fields = exports.typeOptions = undefined;

var _mongodb = require('mongodb');

var _contextable = require('contextable');

/*
* Custom data types definition.
*/

const typeOptions = exports.typeOptions = {
  ObjectId(value) {
    return new _mongodb.ObjectId(value);
  } // we use mongodb
};

/*
* Model fields.
*/

const fields = exports.fields = {
  _id: {
    type: 'ObjectId'
  },
  name: {
    type: 'String',
    validate: [{
      validator: 'presence',
      message: 'is required'
    }]
  }
};

/*
* Virtual instance variables.
*/

const instanceVirtuals = exports.instanceVirtuals = {
  id: {
    get() {
      return this._id;
    }
  },
  errors: {
    get() {
      return this.collectErrors();
    }
  }
};

/*
* Instance methods.
*/

const instanceMethods = exports.instanceMethods = {

  /*
  * Create new or updates existing user in a database.
  */

  async save() {
    let collection = this.$context.mongo.collection('users');

    try {
      await this.validate();
      if (this._id) {
        await collection.updateOne({ _id: this._id }, this, { upsert: true });
      } else {
        await collection.insertOne(this);
      }
      return true;
    } catch (e) {
      await this.handle(e);
      return false;
    }
  }
};

/*
* Class methods.
*/

const classMethods = exports.classMethods = {

  /*
  * Returns a list of users.
  */

  async findAll({ skip = 0, limit = 100 } = {}) {
    let collection = this.$context.mongo.collection('users');

    if (skip < 0) skip = 0;
    if (limit > 100) limit = 100;

    return await collection.find().limit(limit).skip(skip).toArray();
  }
};

/*
* Model schema.
*/

exports.default = new _contextable.Schema({
  typeOptions,
  fields,
  instanceVirtuals,
  instanceMethods,
  classMethods
});