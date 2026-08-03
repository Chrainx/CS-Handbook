'use client'

import { useState } from 'react'
import HashTableView from '@/visualizers/shared/hashTableView'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'
import { OperationControls } from '@/visualizers/shared/operationControls'
import { useOperationHistory } from '@/visualizers/shared/useOperationHistory'
import {
  hashTableInsertSteps,
  hashTableDeleteSteps,
  describeHashTableStep,
  HashTableStep,
} from './steps'
import { hashTableReducer, initialHashTableState } from './state'
import { hashKey } from './hash'

export default function HashTableVisualizer() {
  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [deleteKeyInput, setDeleteKeyInput] = useState('')
  const [searchKeyInput, setSearchKeyInput] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null)

  const {
    state,
    text,
    index,
    length,
    playing,
    run,
    play,
    pause,
    back,
    forward,
    reset,
  } = useOperationHistory<HashTableStep, typeof initialHashTableState>({
    reducer: hashTableReducer,
    initialState: initialHashTableState,
    describeStep: describeHashTableStep,
  })

  function insert() {
    if (keyInput.trim() === '') return
    run(hashTableInsertSteps(state.buckets, keyInput, valueInput))
    setKeyInput('')
    setValueInput('')
    setSearchResult(null)
  }

  function deleteKey() {
    if (deleteKeyInput.trim() === '') return
    run(hashTableDeleteSteps(state.buckets, deleteKeyInput))
    setDeleteKeyInput('')
    setSearchResult(null)
  }

  function search() {
    if (searchKeyInput.trim() === '') return
    const index = hashKey(searchKeyInput)
    const found = state.buckets[index].find((e) => e.key === searchKeyInput)
    setSearchResult(
      found
        ? `Hashed "${searchKeyInput}" to bucket ${index} - found value "${found.value}".`
        : `Hashed "${searchKeyInput}" to bucket ${index} - key not found there.`
    )
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">
          Hash Table Visualizer (separate chaining)
        </div>
        <p className="mt-1 text-sm text-foreground">
          Enter a key and value, then click <strong>Insert</strong> - watch
          the key get hashed to a bucket first, then the entry land there
          (chained onto whatever&apos;s already in that bucket, if
          anything). <strong>Delete</strong> works the same way. Use Pause
          to stop and inspect, or Step Back/Forward to move manually.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          Step <strong>{index}</strong> / <strong>{length}</strong>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Key</label>
        <input
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. apple"
        />
        <label className="text-sm text-muted-foreground">Value</label>
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && insert()}
          className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 3"
        />
        <button
          onClick={insert}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          Insert
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Delete key</label>
        <input
          value={deleteKeyInput}
          onChange={(e) => setDeleteKeyInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && deleteKey()}
          className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. apple"
        />
        <button
          onClick={deleteKey}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Delete
        </button>

        <label className="ml-4 text-sm text-muted-foreground">
          Search key
        </label>
        <input
          value={searchKeyInput}
          onChange={(e) => setSearchKeyInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. apple"
        />
        <button
          onClick={search}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Search
        </button>
      </div>

      <HashTableView buckets={state.buckets} highlightIndex={state.highlightIndex} />

      {searchResult && <StepTextPanel text={searchResult} />}
      <StepTextPanel text={text} />

      <OperationControls
        playing={playing}
        canStepBack={index > 0}
        canStepForward={index < length}
        onPlay={play}
        onPause={pause}
        onStepBack={back}
        onStepForward={forward}
        onReset={reset}
      />
    </>
  )
}
