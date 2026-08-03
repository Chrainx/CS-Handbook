export const TABLE_SIZE = 7

/** Deliberately simple (sum of char codes, mod table size) so the mapping
 * from key to bucket index is easy to show and reason about, not because
 * it is what a real hash table would use. */
export function hashKey(key: string): number {
  let sum = 0
  for (let i = 0; i < key.length; i++) {
    sum += key.charCodeAt(i)
  }
  return sum % TABLE_SIZE
}
