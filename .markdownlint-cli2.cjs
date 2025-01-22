import { markdownlint } from 'markdownlint-cli2';
import { readFileSync } from 'fs';
import { join } from 'path';

const config = JSON.parse(readFileSync(join(__dirname, '.markdownlint.json'), 'utf8'));
const files = process.argv.slice(2);

markdownlint({ config, files });
