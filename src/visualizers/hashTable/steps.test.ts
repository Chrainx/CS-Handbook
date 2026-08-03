import { describe, expect, it } from 'vitest'
import {
  hashTableInsertSteps,
  hashTableDeleteSteps,
  emptyBuckets,
  Entry,
} from './steps'
import { hashKey, TABLE_SIZE } from './hash'

describe('hashKey', () => {
  it('is deterministic for the same key', () => {
    expect(hashKey('abc')).toBe(hashKey('abc'))
  })

  it('always returns an index within the table size', () => {
    for (const key of ['a', 'apple', 'banana', 'zzzzzz', '']) {
      const idx = hashKey(key)
      expect(idx).toBeGreaterThanOrEqual(0)
      expect(idx).toBeLessThan(TABLE_SIZE)
    }
  })
})

describe('hashTableInsertSteps', () => {
  it('inserting into an empty bucket is a "fresh" insert', () => {
    const steps = hashTableInsertSteps(emptyBuckets(), 'a', '1')
    const insertStep = steps.find((s) => s.type === 'insert')
    expect(insertStep).toMatchObject({ kind: 'fresh', key: 'a', value: '1' })
  })

  it('inserting a key that collides with an occupied bucket is a "collision" insert', () => {
    const buckets = emptyBuckets()
    const index = hashKey('a')
    buckets[index] = [{ key: 'other-key', value: 'x' }]

    // Find a key that actually hashes to the same bucket as 'a'
    let collidingKey = 'a'
    for (let i = 0; i < 1000; i++) {
      const candidate = `k${i}`
      if (hashKey(candidate) === index && candidate !== 'other-key') {
        collidingKey = candidate
        break
      }
    }

    const steps = hashTableInsertSteps(buckets, collidingKey, '2')
    const insertStep = steps.find((s) => s.type === 'insert')
    expect(insertStep).toMatchObject({ kind: 'collision' })
  })

  it('re-inserting an existing key is an "update" insert', () => {
    const buckets = emptyBuckets()
    const index = hashKey('a')
    buckets[index] = [{ key: 'a', value: '1' }]

    const steps = hashTableInsertSteps(buckets, 'a', '2')
    const insertStep = steps.find((s) => s.type === 'insert')
    expect(insertStep).toMatchObject({ kind: 'update', value: '2' })
  })

  it('always starts with a hash step at the correct index', () => {
    const steps = hashTableInsertSteps(emptyBuckets(), 'hello', '1')
    expect(steps[0]).toEqual({ type: 'hash', key: 'hello', index: hashKey('hello') })
  })
})

describe('hashTableDeleteSteps', () => {
  it('reports found: true when the key exists', () => {
    const buckets = emptyBuckets()
    const index = hashKey('a')
    buckets[index] = [{ key: 'a', value: '1' }]

    const steps = hashTableDeleteSteps(buckets, 'a')
    const deleteStep = steps.find((s) => s.type === 'delete')
    expect(deleteStep).toMatchObject({ found: true })
  })

  it('reports found: false when the key does not exist', () => {
    const steps = hashTableDeleteSteps(emptyBuckets(), 'missing')
    const deleteStep = steps.find((s) => s.type === 'delete')
    expect(deleteStep).toMatchObject({ found: false })
  })
})

describe('emptyBuckets', () => {
  it('creates TABLE_SIZE independent empty arrays', () => {
    const buckets: Entry[][] = emptyBuckets()
    expect(buckets).toHaveLength(TABLE_SIZE)
    buckets[0].push({ key: 'a', value: '1' })
    expect(buckets[1]).toEqual([])
  })
})
