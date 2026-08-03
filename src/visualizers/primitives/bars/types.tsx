export type BarRange = {
  l: number
  r: number
  mid?: number
}

export type BarMarker = {
  index: number
  label: string
}

export type BarVisualProps = {
  values: number[]

  // coloring
  colorByIndex: (i: number) => string

  // true when this index is part of the current comparison, even if its
  // fill color is already "claimed" by a higher-priority state (e.g. pivot)
  isComparing?: (i: number) => boolean

  // overlays
  splitStack?: BarRange[]
  activeRange?: BarRange | null

  // markers
  markers?: {
    top?: BarMarker[]
    bottom?: BarMarker[]
  }
}
