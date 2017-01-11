const graphqlHTTP = require('express-graphql');
const {Graph} = require('../../graph');

/*
* Returns a GraphQL middleware.
*/

exports.graphServer = function ({graph, config}) {
  return graphqlHTTP((req) => ({
    schema: graph.schema,
    rootValue: graph.rootValue,
    context: req,
    graphiql: config.env === 'development'
  }));
}
