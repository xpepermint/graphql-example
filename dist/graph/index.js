'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = undefined;

var _graphql = require('graphql');

var _contextable = require('contextable');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _root = require('./models/root');

var _root2 = _interopRequireDefault(_root);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* GraphQL application representing application context for managing application
* state, for data validation and unified error hendling.
*/

class Graph extends _contextable.Context {

  /*
  * Class constructor
  */

  constructor({ config, mongo } = {}) {
    super();

    this.config = config; // application configuration
    this.mongo = mongo; // mongodb instance
    this.defineModel('Root', _root2.default); // rootValue model
    this.defineModel('User', _user2.default); // user model

    this.schema = _schema2.default; // GraphQL schema
    this.rootValue = new this.Root(); // GraphQL rootValue
  }

  /*
  * Returns GraphQL schema as string.
  */

  print() {
    return (0, _graphql.printSchema)(_schema2.default);
  }

  /*
  * Returns a promise which executes a GraphQL query.
  */

  exec({ query, vars }) {
    return (0, _graphql.graphql)(this.schema, query, this.rootValue, this, vars);
  }

}
exports.Graph = Graph;