import { print } from '@saga/shared'
export function sub(a: number, b: number) {
  return a - b
}
print(sub(1, 2))