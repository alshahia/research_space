import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const matrixPath = resolve('research', 'agent-app-templates-2026-08-13', '02_STACK_MATRIX.md');
const text = readFileSync(matrixPath, 'utf8');
const INLINE_RE = /`(@?[a-z0-9][\w./-]*)`\s+`?(\^?\d+\.\d+\.\d+(?:-[\w.]+)?)`?\s+\[(S\d+)\]/g;
const matches = [...text.matchAll(INLINE_RE)];
console.log('Inline matches:', matches.length);
for (const m of matches) console.log(m[1], '->', m[2], m[3]);

const AUDIT_RE = /^\|\s*`?([@a-z][\w./-]*)`?\s*\|\s*`?[\d.\w-]+`?\s*\|\s*`?(\d+\.\d+\.\d+(?:-[\w.]+)?)`?\s*(?:\([^)]*\))?\s*\|/gm;
const auditMatches = [...text.matchAll(AUDIT_RE)];
console.log('Audit matches:', auditMatches.length);
for (const m of auditMatches) console.log(m[1], '->', m[2]);
