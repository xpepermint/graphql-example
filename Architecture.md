# Architcture

## File structure

### /src folder

- `/config` - config files
- `/graph` - graphQL server
- `/http` - http server
- `/lib` - mongo DB connection
- `/scripts` - scripts that can be executed from CLI

### /tests folder

Tests written in [ava](https://github.com/avajs/ava) framework

### /dist folder

Compiled distribution folder (target folder of `build`)

## Application structure

The app exports the two main classes `HTTP` and `Graph` in `src/graph` and `src/http` respectively.
These classes are used by `scripts/graph-start.js` to start the various servers:
- Mongo DB server
- HTTP server with GraphQL middleware

```js
(async () => {
  let mongo = await connectToMongo(config.mongoUrl);
  let graph = new Graph({config, mongo});
  let http = new HTTP({config, graph});
  await http.listen();
  console.log(`Listening on ${config.httpHost}:${config.httpPort}`);
})()
.catch((err) => {
  console.error('ERROR:', err);
});
```

In development mode, it is configured to use expose a root endpoint with a graphiql client UI.
You can add your own clients:

- [FetchQL](https://github.com/gucheen/FetchQL)
- [lokka](https://github.com/kadirahq/lokka)
- [apollo-client](https://github.com/apollostack/apollo-client)

See [vue-contextable](https://github.com/xpepermint/vue-contextable) for an example client app using
[apollo-client](https://github.com/apollostack/apollo-client)
and [contextablejs](https://github.com/xpepermint/contextablejs) on the client side.

### Client example

The following is an example where the client saves a model via `$save` that makes a `fetch` to get users
via a graphQL query, sent via `POST` to the server.

`await fetch('/users', {method: 'POST'})` // send request to the remote server

```js
import {Context, Schema} from 'contextable';

const context = new Context(); // context initialization

context.defineModel('User', new Schema({ // defining a model
  fields: {
    name: {
      type: 'String',
      validate: [ // field validations
        { // validator recipe
          validator: 'presence', // validator name
          message: 'is required' // validator error message
        }
      ]
    }
  },
  instanceMethods: {
    async $save () { // create new user on the remote server
      try {
        await this.$validate(); // reactively validate
        await fetch('/users', {method: 'POST'}) // send request to the remote server
          .then((r) => r.json()) // read JSON server response
          .then((r) => this.$applyErrors(r.errors)); // load and display possible server errors
        return this.isValid(); // return true if a user has been created
      }
      catch (e) {
        return false; // user has not been created
      }
    }
  }
}));
```

Add context to [Vue](https://vuejs.org) app.

```
const app = new Vue({
  context, // injecting context into child components
  ...
});
```

## HTTP server

The HTTP server is based on [express-graphql](https://github.com/graphql/express-graphql) which is a bridge to communicate with a GraphQL server via [Express](http://expressjs.com/)
You could substitute this with [koa-graphql](https://github.com/chentsulin/koa-graphql) or [koa-graphql-next](https://github.com/bidanjun/koa-graphql-next)

### Middlewares

The http server is configured with a single middleware, `graphServer` with options set for the graphQL server

```js
export function graphServer ({graph}) {
  return graphqlHTTP((req) => ({
    schema: graph.schema,
    rootValue: new graph.Root(),
    context: req,
    graphiql: graph.config.env === 'development'
  }));
}
```

From `express-graphql`:

`graphiql` If `true`, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
We recommend that you set graphiql to true when your app is in development, because it's quite useful.
You may or may not want it in production.

the `graph.schema` is the GraphQL schema loaded from `graph/schema`

## Graph middleware

`Graph` extends `Contextable` from [ContextableJS](https://github.com/xpepermint/contextablejs)

It defines the models:
- `Root` via `rootSchema`
- `User` via `userSchema`

### Contextable schemas

These Contextable schemas are defined in `/models`

`rootSchema`

```js
export const instanceMethods = {
  async getUsers (args) { ... }
  async createUser (data) { ... }
}

export default new Schema({
  instanceMethods
});
```

`userSchema`

```js
export const fields = {
  _id: {
    type: 'ObjectId'
  },
  name: {
    type: 'String',
    // ...
  }
}

export const instanceMethods = {
  async save () { ... }
}

export const classMethods = {
  async findAll ({skip = 0, limit = 100} = {}) { ... }
}

export default new Schema({
  typeOptions,
  fields,
  instanceVirtuals,
  instanceMethods,
  classMethods
});
```

### GraphQL Schemas

The GraphQL schemas are defined in `/graph/schema/index.graphql`, such as `User`

```
type User {
  id: ID
  name: String
  errors: [Error]
}
```



