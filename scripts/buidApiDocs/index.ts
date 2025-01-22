import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const projectRoot = path.resolve(__dirname, '../../../');
const apiDocsDir = path.join(projectRoot, 'api-docs');

if (!fs.existsSync(apiDocsDir)) {
  fs.mkdirSync(apiDocsDir);
}

execSync('tsc --project tsconfig.json --outDir api-docs', { cwd: projectRoot });
