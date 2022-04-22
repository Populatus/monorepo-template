import { print } from '@saga/shared'
export function add(a: number, b: number) {
  return a + b
}
print(add(1, 2))