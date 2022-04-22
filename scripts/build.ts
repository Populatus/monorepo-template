import rimraf from "rimraf";
import consola from 'consola'
import { execSync as exec } from 'child_process'

async function build() {
  consola.info('Clean up')
  exec('pnpm run clean', { stdio: 'inherit' })
  consola.info('Rollup build')
  exec('pnpm run build:rollup', { stdio: 'inherit' })
}


async function cli() {
  try {
    await build()
  } catch (e) {
    consola.error('error msg stack', e.stack);
    process.exit(1)
  }
}

if (require.main === module) {
  cli()
}