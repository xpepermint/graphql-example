const {graphql, printSchema} = require('graphql');
const schema = require('./schema');
const Root = require('./models/root');

/*
* GraphQL application representing application context for managing application
* state, for data validation and unified error hendling.
*/

exports.Graph = class Graph {

  /*
  * Class constructor
  */

  constructor (...args) {
    this.schema = schema; // GraphQL schema
    this.rootValue = new Root(...args); // GraphQL rootValue
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
