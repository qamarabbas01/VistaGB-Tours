#!/usr/bin/env node
/**
 * Fails if first-load JS for App Router pages exceeds gzip budgets.
 * Run after `next build` from the repo root.
 */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const ROOT = path.resolve(__dirname, '..');
const NEXT_DIR = path.join(ROOT, '.next');

/** Generous enough for Leaflet/assistant code-split pages; tight enough to catch regressions. */
const HOME_BUDGET_BYTES = 180 * 1024;
const PAGE_BUDGET_BYTES = 250 * 1024;

function gzipSize(filePath) {
  return zlib.gzipSync(fs.readFileSync(filePath)).length;
}

function unique(items) {
  return [...new Set(items)];
}

function resolveChunk(rel) {
  const normalized = rel.replace(/^\.next\//, '');
  const candidates = [
    path.isAbsolute(rel) ? rel : path.join(ROOT, rel),
    path.join(NEXT_DIR, normalized),
    path.join(NEXT_DIR, 'static', normalized.replace(/^static\//, '')),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function loadPageChunks() {
  const diagnosticsPath = path.join(
    NEXT_DIR,
    'diagnostics',
    'route-bundle-stats.json',
  );
  if (fs.existsSync(diagnosticsPath)) {
    const rows = JSON.parse(fs.readFileSync(diagnosticsPath, 'utf8'));
    const pages = {};
    for (const row of rows) {
      if (!row || typeof row.route !== 'string') continue;
      pages[row.route] = row.firstLoadChunkPaths ?? [];
    }
    return pages;
  }

  const manifestPath = path.join(NEXT_DIR, 'app-build-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.pages ?? {};
  }

  console.error(
    'Missing .next/diagnostics/route-bundle-stats.json. Run `npm run build` first.',
  );
  process.exit(1);
}

function pageGzipBytes(files) {
  let total = 0;
  const missing = [];

  for (const rel of unique(files)) {
    if (!rel.endsWith('.js')) continue;
    const disk = resolveChunk(rel);
    if (!disk) {
      missing.push(rel);
      continue;
    }
    total += gzipSize(disk);
  }

  return { total, missing };
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

function main() {
  const pages = loadPageChunks();
  const failures = [];

  for (const [route, files] of Object.entries(pages)) {
    const { total, missing } = pageGzipBytes(files);
    const budget =
      route === '/' || route === '/page' || route === '/page.js'
        ? HOME_BUDGET_BYTES
        : PAGE_BUDGET_BYTES;
    const over = total > budget;

    console.log(
      `${over ? 'FAIL' : 'OK  '} ${route.padEnd(40)} ${formatKb(total).padStart(10)} / ${formatKb(budget)} gzip`,
    );
    if (missing.length > 0) {
      console.warn(`      missing chunks: ${missing.join(', ')}`);
    }
    if (over) {
      failures.push(
        `${route} is ${formatKb(total)} gzip (budget ${formatKb(budget)})`,
      );
    }
  }

  if (Object.keys(pages).length === 0) {
    console.error('Bundle manifest has no pages.');
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error('\nBundle budget exceeded:\n- ' + failures.join('\n- '));
    process.exit(1);
  }
}

main();
