import graphqlHTTP from 'express-graphql';
import {Graph} from '../../graph';

/*
* Returns a GraphQL middleware.
*/

export function graphServer ({graph}) {
  return graphqlHTTP((req) => ({
    schema: graph.schema,
    rootValue: new graph.Root(),
    context: req,
    graphiql: graph.config.env === 'development'
  }));
}
