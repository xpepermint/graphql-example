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
  }
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
  }
};

/*
* Instance methods.
*/

const instanceMethods = exports.instanceMethods = {
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
  async findByIds(ids = []) {
    let collection = this.$context.mongo.collection('users');

    return await collection.find({
      _id: { $in: ids.map(i => (0, _mongodb.ObjectId)(i)) }
    }).toArray();
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