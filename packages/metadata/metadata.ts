import type { PackageIndexes } from './types';
import _metadata, { packages as _packages } from './index.json';

export const metadata = _metadata as PackageIndexes;
export const packages = _packages as PackageIndexes['packages'];
