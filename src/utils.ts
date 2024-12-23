export function removeAt<T>(array: T[], idx: number): T[] {
  return array.slice(0, idx).concat(array.slice(idx + 1, array.length));
}
