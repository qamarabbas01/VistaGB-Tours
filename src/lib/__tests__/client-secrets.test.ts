import { execFileSync } from 'node:child_process';
import path from 'node:path';

const script = path.join(process.cwd(), 'scripts/check-client-secrets.js');

describe('client secret guard', () => {
  it('passes for the current source tree', () => {
    const output = execFileSync(process.execPath, [script], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    expect(output).toMatch(/OK: no secret env vars in client modules/);
  });
});
