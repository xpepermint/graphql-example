import test from 'ava';
import * as graph from '../dist';

test('exposed content', async (t) => {
  t.is(!!graph.Graph, true);
  t.is(!!graph.HTTP, true);
});
