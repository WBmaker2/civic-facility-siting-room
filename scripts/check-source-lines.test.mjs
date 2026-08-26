import { describe, expect, it } from 'vitest';
import { countPhysicalLines } from './check-source-lines.mjs';

function makeLines(count, trailingNewline) {
  const contents = Array.from({ length: count }, (_, index) => `line ${index + 1}`).join('\n');
  return trailingNewline ? `${contents}\n` : contents;
}

describe('countPhysicalLines', () => {
  it('does not treat a trailing newline as an extra line', () => {
    expect(countPhysicalLines(makeLines(499, false))).toBe(499);
    expect(countPhysicalLines(makeLines(499, true))).toBe(499);
    expect(countPhysicalLines(makeLines(500, false))).toBe(500);
    expect(countPhysicalLines(makeLines(500, true))).toBe(500);
  });
});
