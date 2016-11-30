const fs = require('fs');
const {join} = require('path');
const {buildSchema} = require('graphql');

/*
* Public GraphQL schema.
*/

module.exports = buildSchema(
  fs.readFileSync(join(__dirname, 'index.graphql'), 'utf-8')
);
