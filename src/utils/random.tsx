type RandomArrayOptions = {
  size?: number
  min?: number
  max?: number
  unique?: boolean
}

/**
 * Generate a random integer array.
 */
export function generateRandomArray({
  size = 5,
  min = 1,
  max = 9,
  unique = false,
}: RandomArrayOptions = {}): number[] {
  if (unique && max - min + 1 < size) {
    throw new Error('Range too small for unique values')
  }

  if (!unique) {
    return Array.from(
      { length: size },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    )
  }

  // Unique case
  const set = new Set<number>()
  while (set.size < size) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min
    set.add(value)
  }

  return Array.from(set)
}
