import {ObjectId} from 'mongodb';
import {Schema} from 'contextable';

/*
* Custom data types definition.
*/

export const typeOptions = {
  ObjectId (value) { return new ObjectId(value) }
};

/*
* Model fields.
*/

export const fields = {
  _id: {
    type: 'ObjectId'
  },
  name: {
    type: 'String',
    validate: [
      {
        validator: 'presence',
        message: 'is required'
      }
    ]
  }
};

/*
* Virtual instance variables.
*/

export const instanceVirtuals = {
  id: {
    get () { return this._id }
  }
};

/*
* Instance methods.
*/

export const instanceMethods = {
  async save () {
    let collection = this.$context.mongo.collection('users');

    try {
      await this.validate();
      if (this._id) {
        await collection.updateOne({_id: this._id}, this, {upsert: true});
      }
      else {
        await collection.insertOne(this);
      }
      return true;
    }
    catch (e) {
      await this.handle(e);
      return false;
    }
  }
};

/*
* Class methods.
*/

export const classMethods = {
  async findByIds (ids = []) {
    let collection = this.$context.mongo.collection('users');

    return await collection.find({
      _id: {$in: ids.map(i => ObjectId(i))}
    }).toArray();
  }
};

/*
* Model schema.
*/

export default new Schema({
  typeOptions,
  fields,
  instanceVirtuals,
  instanceMethods,
  classMethods
});
