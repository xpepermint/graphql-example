const {graphql, printSchema} = require('graphql');
const {Context} = require('contextable');
const schema = require('./schema');
const rootSchema = require('./models/root');
const userSchema = require('./models/user');

/*
* GraphQL application representing application context for managing application
* state, for data validation and unified error hendling.
*/

exports.Graph = class Graph extends Context {

  /*
  * Class constructor
  */

  constructor ({config, mongo} = {}) {
    super();

    this.config = config; // application configuration
    this.mongo = mongo; // mongodb instance
    this.defineModel('Root', rootSchema); // rootValue model
    this.defineModel('User', userSchema); // user model

    this.schema = schema; // GraphQL schema
    this.rootValue = new this.Root(); // GraphQL rootValue
  }

  /*
  * Returns GraphQL schema as string.
  */

  print () {
    return printSchema(schema);
  }

  /*
  * Returns a promise which executes a GraphQL query.
  */

  exec ({query, vars}) {
    return graphql(this.schema, query, this.rootValue, this, vars);
  }

}
