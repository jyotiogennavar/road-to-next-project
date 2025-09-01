#!/usr/bin/env node

// Auto-update PROJECT_DOCUMENTATION.md with a changelog entry for the latest commit.
// Intended to be called from a Git pre-commit hook so the update is included in the same commit.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8' }).trim();
}

function safeRun(cmd) {
  try {
    return run(cmd);
  } catch (e) {
    return '';
  }
}

const repoRoot = process.cwd();
const docPath = path.join(repoRoot, 'PROJECT_DOCUMENTATION.md');

if (!fs.existsSync(docPath)) {
  // Nothing to do
  process.exit(0);
}

// Gather metadata from the to-be-created commit (staged changes) and HEAD
const headHash = safeRun('git rev-parse --verify HEAD');
const subject = safeRun('git log -1 --pretty=%s');
const author = safeRun('git log -1 --pretty="%an <%ae>"');
const date = safeRun('git log -1 --date=iso-strict --pretty=%ad');

// List staged changes compared to HEAD index
// If nothing staged yet (first commit or similar), fall back to last commit changes
let changed;
try {
  // name-status from index, use diff --cached against HEAD
  changed = run('git diff --cached --name-status');
  if (!changed) {
    changed = run('git diff-tree --no-commit-id --name-status -r HEAD');
  }
} catch {
  changed = '';
}

const changedLines = changed
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .map((l) => {
    const [status, ...rest] = l.split(/\s+/);
    const file = rest.join(' ');
    return `  - ${status} ${file}`;
  })
  .join('\n');

const hashShort = headHash ? headHash.slice(0, 7) : 'working-tree';
const entryLines = [
  `### ${subject || 'Update'} (${hashShort})`,
  `- author: ${author || 'unknown'}`,
  `- date: ${date || new Date().toISOString()}`,
  `- files:`,
  changedLines || '  - (no staged file list available)',
  '',
].join('\n');

const original = fs.readFileSync(docPath, 'utf-8');
const header = '## Changelog';

let updated;
const headerIdx = original.indexOf(header);
if (headerIdx === -1) {
  // Append a new Changelog section at the end
  updated = `${original.trim()}\n\n${header}\n\n${entryLines}`;
} else {
  // Insert entry after the header line
  const before = original.slice(0, headerIdx + header.length);
  const after = original.slice(headerIdx + header.length);
  // Ensure a blank line after header
  updated = `${before}\n\n${entryLines}${after.replace(/^\n*/, '\n')}`;
}

fs.writeFileSync(docPath, updated, 'utf-8');

// Exit success
process.exit(0);


