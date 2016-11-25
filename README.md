# graphql-example

> Intuitive GraphQL Resolver Example - Application example using contextable.js as GraphQL rootValue on steroids.

This is a pure server application, using [GraphiQL](https://github.com/graphql/graphiql) as a generic interface for GraphQL
queries and mutations

## Features

> This example uses Node.js v7 and MongoDB.

* GraphQL rootValue using [contextable.js](https://github.com/xpepermint/contextablejs).
* Nested schema.
* Print GraphQL schema from command-line.
* Execute GraphQL schema from command-line.
* Input data validation.
* Context-aware models.
* Graphql HTTP server.
* MongoDB connector.

## Pre-requisites

- Install MongoDB
- Start mongo, f.ex `$ mongod`

## Build Setup

```
# install dependencies
npm install

# transpile source code (we use ES6 features)
npm run build

# start the server (GraphiQL is started at http://127.0.0.1:4444)
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

Starts [GraphiQL server](https://medium.com/the-graphqlhub/graphiql-graphql-s-killer-app-9896242b2125#.xt4jo8bet) at `http://127.0.0.1:4444/`

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

## Tutorials

Node.js tutorials: [Node.js Cheatsheet](https://xpepermint.gitbooks.io/nodejs-cheatsheet/)
