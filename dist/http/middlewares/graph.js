'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphServer = graphServer;

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graph = require('../../graph');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Returns a GraphQL middleware.
*/

function graphServer({ graph }) {
  return (0, _expressGraphql2.default)(req => ({
    schema: graph.schema,
    rootValue: new graph.Root(),
    context: req,
    graphiql: graph.config.env === 'development'
  }));
}