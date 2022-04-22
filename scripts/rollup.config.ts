import type { RollupOptions, OutputOptions } from 'rollup'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import { packages } from '../meta/packages'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
const esbuildPlugin = esbuild()
const esbuildMinifer = (options: ESBuildOptions) => {
  const { renderChunk } = esbuild(options)

  return {
    name: 'esbuild-minifer',
    renderChunk,
  }
}

const configs: RollupOptions[] = []
for (const { name, mjs, cjs, iife, build, globals, target } of packages) {
  if (build === false)
    continue

  const iifeGlobals = {
    '@saga/shared': 'Saga',
    '@saga/core': 'Saga',
    ...(globals || {}),
  }

  const iifeName = 'Saga'
  const functionNames = ['index']
  for (const fn of functionNames) {
    const input = `packages/${name}/index.ts`
    const output: OutputOptions[] = []
    if (mjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.mjs`,
        format: 'es',
      })
    }

    if (cjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.cjs`,
        format: 'cjs',
      })
    }

    if (iife !== false) {
      output.push(
        {
          file: `packages/${name}/dist/${fn}.iife.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
        },
        {
          file: `packages/${name}/dist/${fn}.iife.min.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
          plugins: [
            esbuildMinifer({
              minify: true,
            }),
          ],
        },
      )
    }
    configs.push({
      input,
      output,
      plugins: [
        target
          ? esbuild({ target })
          : esbuildPlugin,
        json(),
      ],
    })
    console.log(input)

  }
}
export default configs
