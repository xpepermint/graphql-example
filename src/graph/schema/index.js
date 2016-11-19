import fs from 'fs';
import path from 'path';
import {buildSchema} from 'graphql';

/*
* Public GraphQL schema.
*/

export default buildSchema(
  fs.readFileSync(path.join(__dirname, 'index.graphql'), 'utf-8')
);
