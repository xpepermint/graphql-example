const test = require('ava');
const graph = require('../src');

test('exposed content', async (t) => {
  t.is(!!graph.Graph, true);
  t.is(!!graph.HTTP, true);
});
