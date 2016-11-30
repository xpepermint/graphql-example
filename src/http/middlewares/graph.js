const graphqlHTTP = require('express-graphql');
const {Graph} = require('../../graph');

/*
* Returns a GraphQL middleware.
*/

exports.graphServer = function ({graph}) {
  return graphqlHTTP((req) => ({
    schema: graph.schema,
    rootValue: new graph.Root(),
    context: req,
    graphiql: graph.config.env === 'development'
  }));
}
