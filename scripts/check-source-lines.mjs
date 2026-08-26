import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
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

export function countPhysicalLines(contents) {
  if (contents.length === 0) return 0;
  const lineBreaks = contents.match(/\r\n|\r|\n/g)?.length ?? 0;
  const endsWithLineBreak = /\r\n$|\r$|\n$/.test(contents);
  return lineBreaks + (endsWithLineBreak ? 0 : 1);
}

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
    const lines = countPhysicalLines(contents);
    if (lines >= 500) overLimit.push({ lines, path: path.relative(root, entryPath) });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  await walk(root);

  if (overLimit.length > 0) {
    for (const file of overLimit) console.error(`${file.path}: ${file.lines} lines (limit: 499)`);
    process.exitCode = 1;
  } else {
    console.log(`Checked ${checked} source files; 0 files at or above 500 lines.`);
  }
}
