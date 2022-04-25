export interface PackageManifest {
  name: string
  display?: string
  addon?: boolean
  author?: string
  description?: string
  external?: string[]
  globals?: Record<string, string>
  manualImport?: boolean
  deprecated?: boolean
  submodules?: boolean
  build?: boolean
  iife?: boolean
  cjs?: boolean
  mjs?: boolean
  dts?: boolean
  target?: string
  utils?: boolean
  copy?: string[]
}
export const packages: PackageManifest[] = [
  // {
  //   name: 'metadata',
  //   display: 'Metadata',
  //   utils: true
  // },
  // {
  //   name: 'components',
  //   display: 'Components',
  //   external: [
  //     '@cxygg/core',
  //     '@cxygg/shared',
  //   ],
  // },

  {
    name: 'core',
    display: 'cxygg',
  },
  {
    name: 'shared',
    display: 'Shared',
  },
];
