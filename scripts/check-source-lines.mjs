import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.html']);
const ignoredDirectories = new Set([
  '.git',
  'node_modules',
  'dist',
  'coverage',
  'playwright-report',
  'test-results',
]);
const overLimit = [];
let checked = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(entryPath);
      continue;
    }
    if (!sourceExtensions.has(path.extname(entry.name))) continue;
    checked += 1;
    const contents = await readFile(entryPath, 'utf8');
    const lines = contents.length === 0 ? 0 : contents.split(/\r\n|\r|\n/).length;
    if (lines >= 500) overLimit.push({ lines, path: path.relative(root, entryPath) });
  }
}

await walk(root);

if (overLimit.length > 0) {
  for (const file of overLimit) console.error(`${file.path}: ${file.lines} lines (limit: 499)`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} source files; 0 files at or above 500 lines.`);
}
