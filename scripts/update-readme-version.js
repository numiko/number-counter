// This script is responsible for updating the version in the README.md file.

import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const readmePath = './README.md';
let readme = readFileSync(readmePath, 'utf8');

// Replace only the version number part (e.g., 0.2.7 in v0.2.7 or v0-2-7)
readme = readme.replace(
  /v[0-9]+[.-][0-9]+[.-][0-9]+/g,
  `v${pkg.version.replace(/\./g, '-')}`
);

writeFileSync(readmePath, readme);
