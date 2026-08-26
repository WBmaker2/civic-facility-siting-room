import assert from 'node:assert/strict';
import { test } from 'node:test';
import { countPhysicalLines } from './check-source-lines.mjs';

function makeLines(count, trailingNewline) {
  const contents = Array.from({ length: count }, (_, index) => `line ${index + 1}`).join('\n');
  return trailingNewline ? `${contents}\n` : contents;
}

test('counts physical lines without treating a trailing newline as an extra line', () => {
  assert.equal(countPhysicalLines(makeLines(499, false)), 499);
  assert.equal(countPhysicalLines(makeLines(499, true)), 499);
  assert.equal(countPhysicalLines(makeLines(500, false)), 500);
  assert.equal(countPhysicalLines(makeLines(500, true)), 500);
});
