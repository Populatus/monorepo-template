import { join, resolve } from 'path'
import fs from 'fs-extra'
import { packages } from '../meta/packages'
export const DIR_SRC = resolve(__dirname, '../packages')
export async function updatePackageJSON() {
  for (const { name, description, author, iife } of packages) {
    const packageDir = join(DIR_SRC, name)
    const packageJSONPath = join(packageDir, 'package.json')
    const packageJSON = await fs.readJSON(packageJSONPath)
    packageJSON.description = description || packageJSON.description
    packageJSON.author = author || 'Cxygg <https://github.com/cxygg>'
    packageJSON.homepage = name === 'core'
      ? 'https://github.com/cxygg/saga_monorepo'
      : `https://github.com/cxygg/saga_monorepo/tree/master/packages/${name}`
    packageJSON.repository = {
      type: 'git',
      url: 'git+https://github.com/cxygg/saga_monorepo.git',
      directory: `packages/${name}`,
    }
    packageJSON.main = './index.cjs'
    packageJSON.types = './index.d.ts'
    packageJSON.module = './index.mjs'
    if (iife !== false) {
      packageJSON.unpkg = './index.iife.min.js'
      packageJSON.jsdelivr = './index.iife.min.js'
    }
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
        types: './index.d.ts',
      },
      './*': './*',
      ...packageJSON.exports,
    }
    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}