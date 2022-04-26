# Saga_Monorepo
>  A TypeScript projects can be quickly generate monorepo template


## Script

```
  "preinstall": "pnpx only-allow pnpm",
  "lint": "eslint --ext=.js,.ts .",
  "lint:fix": "nr lint --fix",
  "start": "nr start --filter '*'",
  "prepare": "husky-install",
  "build": "nr update && esno scripts/build.ts",
  "build:rollup": "rollup -c",
  "clean": "rimraf dist packages/*/dist",
  "update": "nr -C packages/metadata update && esno scripts/update.ts",
  "changeset": "changeset ",
  "version": "changeset version",
  "release": "nr build && pnpm release:only",
  "release:only": "changeset publish --registry=https://registry.npmjs.com/",
  "publish": "esno scripts/publish.ts"
```
