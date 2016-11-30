# graphql-example

> Intuitive GraphQL Resolver Example - Application example using contextable.js as GraphQL rootValue on steroids.

`GraphQL` is a modern replacement for the well known REST API server. This is a pure GraphQL server application - an example API server.

## Features

> This example uses Node.js v7 and MongoDB.

* GraphQL rootValue using [contextable.js](https://github.com/xpepermint/contextablejs).
* Nested schema.
* Print GraphQL schema from command-line.
* Execute GraphQL schema from command-line.
* Input data validation.
* Context-aware models.
* Graphql HTTP server.
* MongoDB connector (an example how to use a database connector).

## Pre-requisites

- Make sure you are using Node.js v7+.
- Install and start MongoDB server.

## Build Setup

```
# install dependencies
npm install

# start the server (GraphiQL is started at http://127.0.0.1:3000)
npm start

# use nodemon in development to automatically reload the server on changes
npm install -g nodemon
nodemon --exec npm start

# run GraphQL query from command-line
npm run exec '{getUsers {id name}}'

# run tests
npm test
```

## Run

`npm start`

Starts [GraphiQL server](https://medium.com/the-graphqlhub/graphiql-graphql-s-killer-app-9896242b2125#.xt4jo8bet) at `http://127.0.0.1:3000/`

## Query Examples

```js
mutation { # create new user
  createUser(name: "") {
    id
    name
    errors {
      path
      errors {
      	validator
      	message
      	code
      }
    }
  }
}
```

```js
query { # get users
  getUsers(skip: 0, limit: 5) {
    id
    name
  }
}
```

## Architcture

```
|- /config    - config files
|- /scripts   - scripts that can be executed from CLI (used by `package.json`)
|- /src
  |- /graph`    - GraphQL application
  |- /http      - HTTP server
  |- /lib       - general helpers (e.g. Mongo DB connector)
  |- index.js   - application main file
- /tests        - tests written in [ava](https://github.com/avajs/ava) framework
```

The application exports two main classes - `Graph` (GraphQL application - `src/http`) and `HTTP` (HTTP server - `src/graph`). Each class represents a stand-alone application. You could create two separated npm packages from this to further split your code to responsibilities.

The scripts in the `./src/scripts` folder use these classes to print GraphQL schema, execute GraphQL query and start the HTTP server from the command-line. These scripts are used by the `package.json` file thus you can use the `npm run {script-name}` commands.

Graph application describes your data model and provides a communication layer. HTTP application exposes GraphQL application over HTTP thus users can use the GraphQL application as your API endpoint.

The HTTP server is based on [express-graphql](https://github.com/graphql/express-graphql) which is a bridge to communicate with a GraphQL application via [Express](http://expressjs.com/) HTTP server. You could substitute this with [koa-graphql](https://github.com/chentsulin/koa-graphql) or [koa-graphql-next](https://github.com/bidanjun/koa-graphql-next). The `express-graphql` middleware includes a [GraphiQL](https://github.com/graphql/graphiql) user interface which is a generic interface for running GraphQL queries and mutations (for use in development).

The Graph application exposes the API over the GraphQL schema defined in `./src/graph/schema/index.graphql`. It uses the  [contextable.js](https://github.com/xpepermint/contextablejs#graphql-root-resolver) for describing and validating input data. To keep the example simple, we only have two models here where the `Root` model represents a GraphQL resolver - a [root value](http://graphql.org/code/) for the GraphQL.

## GraphQL Clients

Your front-end application will need a `GraphQL client` to communicate with a GraphQL server. You can also use a raw browser's `fetch` to post data to the GraphQL server.

Popular GraphQL clients (you can add your own):

* [FetchQL](https://github.com/gucheen/FetchQL)
* [lokka](https://github.com/kadirahq/lokka)
* [apollo-client](https://github.com/apollostack/apollo-client)

## Tutorials

Node.js tutorials: [Node.js Cheatsheet](https://xpepermint.gitbooks.io/nodejs-cheatsheet/)
