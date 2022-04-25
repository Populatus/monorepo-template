import consola from 'consola';
import path from 'path';
import fs from 'fs-extra';
import { execSync as exec } from 'child_process';
import { packages } from '../meta/packages';

async function buildMetaFiles() {
  for (const { name } of packages) {
    const packageRoot = path.resolve(__dirname, '..', 'packages', name);
    const packageDist = path.resolve(packageRoot, 'dist');
    const packageJSON = await fs.readJSON(path.join(packageRoot, 'package.json'));
    await fs.writeJSON(path.join(packageDist, 'package.json'), packageJSON, { spaces: 2 });
  }
}
async function build() {
  consola.info('Clean up');
  exec('pnpm run clean', { stdio: 'inherit' });
  consola.info('Rollup build');
  exec('pnpm run build:rollup', { stdio: 'inherit' });
  consola.info('Build metafiles');
  await buildMetaFiles();
}

async function cli() {
  try {
    await build();
  } catch (e) {
    consola.error('error msg stack', e.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  cli();
}
