import type { RollupOptions, OutputOptions } from 'rollup';
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild';
import esbuild from 'rollup-plugin-esbuild';
import dtsPlugin from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import { packages } from '../meta/packages';

const esbuildPlugin = esbuild();
const esbuildMinifer = (options: ESBuildOptions) => {
  const { renderChunk } = esbuild(options);

  return {
    name: 'esbuild-minifer',
    renderChunk,
  };
};

const configs: RollupOptions[] = [];
for (const {
  name, mjs, cjs, iife, build, globals, target, dts,
} of packages) {
  if (build === false) { continue; }

  const iifeGlobals = {
    '@cxygg/shared': 'cxygg',
    '@cxygg/core': 'cxygg',
    ...(globals || {}),
  };

  const iifeName = 'cxygg';
  const functionNames = ['index'];
  for (const fn of functionNames) {
    const input = `packages/${name}/index.ts`;
    const output: OutputOptions[] = [];
    if (mjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.mjs`,
        format: 'es',
      });
    }

    if (cjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.cjs`,
        format: 'cjs',
      });
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
      );
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
    });
    if (dts !== false) {
      configs.push({
        input,
        output: {
          file: `packages/${name}/dist/${fn}.d.ts`,
          format: 'es',
        },
        plugins: [dtsPlugin()],
      });
    }
  }
}
export default configs;
