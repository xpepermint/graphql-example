# graphql-example

> A GraphQL application example (intuitive rootValue resolvers using Contextable.js)

## Features

> This example uses Node.js v7 and MongoDB.

* Print GraphQL schema from command-line.
* Execute GraphQL schema from command-line.
* Graphql HTTP server.
* GraphQL rootValue using [contextable.js](https://github.com/xpepermint/contextablejs) - data management, validation and error handling with .
* MongoDB connector.

## Build Setup

```
# install dependencies
npm install

# switch environment to production
npm config set graphql-example:env production

# transpile source code
npm run build

# start the server (GraphiQL is started at http://127.0.0.1:4444)
npm start

# use nodemon in development to automatically reload the server on changes
npm install -g nodemon
nodemon --exec npm start

# run GraphQL query
npm run exec '{getUsersById(ids: ["2f4efaf63a8c6310397667"]) {id name}}'
```

## Tutorials

Node.js tutorials: [Node.js Cheatsheet](https://xpepermint.gitbooks.io/nodejs-cheatsheet/)
