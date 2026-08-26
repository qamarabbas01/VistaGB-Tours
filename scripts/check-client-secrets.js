#!/usr/bin/env node
/**
 * Fails if secret env vars (RESEND, OpenAI, contact inbox) appear in client
 * modules or are exposed via NEXT_PUBLIC_*. Run from the repo root.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

const SECRET_NAMES = [
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "CONTACT_EMAIL_TO",
  "OPENAI_API_KEY",
];

const PUBLIC_SECRET_RE =
  /NEXT_PUBLIC_(?:RESEND|OPENAI|CONTACT_EMAIL_TO|[A-Z0-9_]*?(?:API_KEY|SECRET|TOKEN|PASSWORD))/;

const SERVER_ENV_IMPORT_RE = /@\/lib\/server-env|from ["']server-only["']/;

const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs)$/;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXT.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function stripLeadingComments(source) {
  return source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)+/, "");
}

function isClientModule(source) {
  const start = stripLeadingComments(source).trimStart();
  return start.startsWith('"use client"') || start.startsWith("'use client'");
}

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function report(rel, line, message) {
  return `${rel}:${line}: ${message}`;
}

function checkFile(file) {
  const source = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  const errors = [];
  const client = isClientModule(source);

  if (PUBLIC_SECRET_RE.test(source)) {
    const match = source.match(PUBLIC_SECRET_RE);
    const idx = match ? source.indexOf(match[0]) : 0;
    errors.push(
      report(
        rel,
        lineNumber(source, idx),
        `public env name ${match[0]} would leak a secret to the browser`,
      ),
    );
  }

  if (!client) return errors;

  if (SERVER_ENV_IMPORT_RE.test(source)) {
    errors.push(
      report(rel, 1, "client module must not import server-only secret helpers"),
    );
  }

  for (const name of SECRET_NAMES) {
    const idx = source.indexOf(name);
    if (idx !== -1) {
      errors.push(
        report(rel, lineNumber(source, idx), `secret ${name} must stay server-side`),
      );
    }
  }

  const envRe = /process\.env\.([A-Z0-9_]+)/g;
  let envMatch;
  while ((envMatch = envRe.exec(source))) {
    const key = envMatch[1];
    if (key === "NODE_ENV" || key.startsWith("NEXT_PUBLIC_")) continue;
    errors.push(
      report(
        rel,
        lineNumber(source, envMatch.index),
        `process.env.${key} is not allowed in client modules`,
      ),
    );
  }

  return errors;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error("src/ directory not found — run from the repository root.");
    process.exit(1);
  }

  const errors = walk(SRC).flatMap(checkFile);
  if (errors.length > 0) {
    console.error("Secret env vars must not appear in client bundles:\n");
    for (const error of errors) {
      console.error(`  ${error}`);
    }
    process.exit(1);
  }

  console.log("OK: no secret env vars in client modules.");
}

main();
