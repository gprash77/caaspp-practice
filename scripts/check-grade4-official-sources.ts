/** Independent freshness check: download the files linked by the official CAASPP resource page.
 * Does not regenerate or approve golden data. A changed file fails the check for manual review.
 */
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sources from '../data/official/grade-4/test-1/sources.json';
const directory = mkdtempSync(path.join(tmpdir(), 'caaspp-official-check-'));
let failed = false;
for (const source of sources.sections) {
  const destination = path.join(directory, `${source.id}.pdf`);
  const download = spawnSync('curl', ['--fail', '--location', '--silent', '--show-error', '--retry', '2', '--max-time', '60', '--user-agent', 'Mozilla/5.0', source.url, '--output', destination], { encoding: 'utf8' });
  if (download.status !== 0) {
    failed = true; console.error(`${source.id}: DOWNLOAD FAILED — ${download.stderr.trim()}`); continue;
  }
  const bytes = readFileSync(destination);
  const digest = createHash('sha256').update(bytes).digest('hex');
  const pdf = bytes.subarray(0, 5).toString() === '%PDF-';
  const info = spawnSync('pdfinfo', [destination], { encoding: 'utf8' });
  const pageCount = Number(info.stdout?.match(/^Pages:\s+(\d+)/m)?.[1]);
  const pagesMatch = !Number.isFinite(pageCount) || pageCount === source.pageCount;
  const matches = pdf && digest === source.sha256 && pagesMatch;
  if (!matches) failed = true;
  console.log(`${source.id}: ${matches ? 'PASS' : 'FAIL'} · SHA-256 ${digest} · ${Number.isFinite(pageCount) ? `${pageCount} pages` : 'page count unverified (pdfinfo unavailable)'}`);
}
console.log(`Files retained for review: ${directory}`);
console.log('A matching file hash proves source freshness, not transcription or scoring correctness. Run content, scoring and browser gates separately.');
if (failed) process.exitCode = 1;
