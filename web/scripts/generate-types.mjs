#!/usr/bin/env node
// Generate FE types from backend OpenAPI and agent JSON Schemas
// - Requires devDeps: openapi-typescript, json-schema-to-typescript

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd(), '..');
const webDir = process.cwd();
const backendDir = path.join(repoRoot, 'backend');

async function genOpenAPI() {
  const { default: openapiTS } = await import('openapi-typescript');
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  const url = `${base}/openapi.json`;
  const dts = await openapiTS(url, { version: 3 });
  const out = path.join(webDir, 'types', 'openapi.d.ts');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, dts);
  console.log(`Generated: ${out}`);
}

async function genAgentSchemas() {
  const { compileFromFile } = await import('json-schema-to-typescript');
  const schemasDir = path.join(backendDir, 'src', 'app', 'contracts', 'agent');
  if (!fs.existsSync(schemasDir)) {
    console.warn(`No agent schemas dir found at ${schemasDir}`);
    return;
  }
  const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));
  const outDir = path.join(webDir, 'types');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of files) {
    const src = path.join(schemasDir, f);
    const name = f.replace(/\.json$/, '.d.ts');
    const out = path.join(outDir, name);
    const dts = await compileFromFile(src, { bannerComment: '' });
    fs.writeFileSync(out, dts);
    console.log(`Generated: ${out}`);
  }
}

const which = process.argv[2] || 'all';
if (which === 'openapi') {
  await genOpenAPI();
} else if (which === 'agent') {
  await genAgentSchemas();
} else {
  await genOpenAPI();
  await genAgentSchemas();
}

