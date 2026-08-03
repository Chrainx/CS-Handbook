'use client'

import { useState } from 'react'
import LinkedListView from '@/visualizers/shared/linkedListView'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'
import { OperationControls } from '@/visualizers/shared/operationControls'
import { useOperationHistory } from '@/visualizers/shared/useOperationHistory'
import {
  linkedListReducer,
  linkedListInsertHeadSteps,
  linkedListInsertTailSteps,
  linkedListDeleteSteps,
  initialLinkedListState,
  describeLinkedListStep,
  LinkedListStep,
} from './types'

export default function LinkedListVisualizer() {
  const [input, setInput] = useState('')
  const [deleteInput, setDeleteInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const [highlightValue, setHighlightValue] = useState<number | null>(null)

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
  } = useOperationHistory<LinkedListStep, typeof initialLinkedListState>({
    reducer: linkedListReducer,
    initialState: initialLinkedListState,
    describeStep: describeLinkedListStep,
  })

  function clearSearch() {
    setSearchResult(null)
    setHighlightValue(null)
  }

  function insertHead() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    run(linkedListInsertHeadSteps(state.list, value))
    setInput('')
    clearSearch()
  }

  function insertTail() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    run(linkedListInsertTailSteps(state.list, value))
    setInput('')
    clearSearch()
  }

  function deleteValue() {
    const value = Number(deleteInput)
    if (deleteInput.trim() === '' || Number.isNaN(value)) return
    run(linkedListDeleteSteps(state.list, value))
    setDeleteInput('')
    clearSearch()
  }

  function search() {
    const value = Number(searchInput)
    if (searchInput.trim() === '' || Number.isNaN(value)) return
    const foundIndex = state.list.indexOf(value)
    setHighlightValue(foundIndex === -1 ? null : value)
    setSearchResult(
      foundIndex === -1
        ? `${value} was not found in the list.`
        : `Found ${value} at position ${foundIndex} from the head.`
    )
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">
          Linked List Visualizer
        </div>
        <p className="mt-1 text-sm text-foreground">
          Each node is drawn as two cells: its <strong>value</strong> and its{' '}
          <strong>next</strong> pointer. <strong>Insert at Head</strong>{' '}
          creates a node, points it at the current head, then moves head to
          it - no traversal needed.{' '}
          <strong>Insert at Tail</strong> and <strong>Delete</strong> walk
          the list node-by-node first (there&apos;s no direct reference to
          the tail or to an arbitrary value), shown as the cursor moving
          along the next pointers, before relinking. Use Pause to stop and
          inspect, or Step Back/Forward to move manually.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          Step <strong>{index}</strong> / <strong>{length}</strong>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Value</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && insertTail()}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 7"
        />
        <button
          onClick={insertHead}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          Insert at Head
        </button>
        <button
          onClick={insertTail}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          Insert at Tail
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Delete value</label>
        <input
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && deleteValue()}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 7"
        />
        <button
          onClick={deleteValue}
          disabled={state.list.length === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Delete
        </button>

        <label className="ml-4 text-sm text-muted-foreground">
          Search value
        </label>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 7"
        />
        <button
          onClick={search}
          disabled={state.list.length === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Search
        </button>
      </div>

      <LinkedListView
        list={state.list}
        highlightValue={highlightValue}
        cursorIndex={state.cursorIndex}
        targetIndex={state.targetIndex}
        pendingNode={state.pendingNode}
      />

      {searchResult && <StepTextPanel text={searchResult} />}
      <StepTextPanel text={text} />

      <OperationControls
        playing={playing}
        canStepBack={index > 0}
        canStepForward={index < length}
        onPlay={play}
        onPause={pause}
        onStepBack={() => {
          clearSearch()
          back()
        }}
        onStepForward={() => {
          clearSearch()
          forward()
        }}
        onReset={() => {
          clearSearch()
          reset()
        }}
      />
    </>
  )
}
