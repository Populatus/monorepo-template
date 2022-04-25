import { execSync } from 'child_process';
import path from 'path';
import consola from 'consola';
import { packages } from '../meta/packages';

execSync('npm run build', { stdio: 'inherit' });
const command = 'npm publish --access public ';
for (const { name } of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') });
  consola.success(`Published @cxygg/${name}`);
}
