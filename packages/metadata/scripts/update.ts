import path from 'path'
import fs from 'fs-extra'
import { packages } from '../../../meta/packages';
import { PackageIndexes } from '../types'
export const DIR_PACKAGE = path.resolve(__dirname, '..')
export const DIR_ROOT = path.resolve(__dirname, '../../..')
export const DIR_SRC = path.resolve(DIR_ROOT, 'packages')
async function readMetadata() {
  const indexes: PackageIndexes = {
    packages: {}
  }
  for (const info of packages) {
    if (info.utils)
      continue
    const dir = path.join(DIR_SRC, info.name)
    const pkg = {
      ...info,
      dir: path.relative(DIR_ROOT, dir).replace(/\\/g, '/'),
    }
    indexes.packages[info.name] = pkg
  }
  return indexes
}
async function run() {
  const indexes = await readMetadata()
  await fs.writeJSON(path.join(DIR_PACKAGE, 'index.json'), indexes, { spaces: 2 })
}
run()