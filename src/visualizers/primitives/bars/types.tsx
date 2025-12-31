export type BarRange = {
  l: number
  r: number
  mid?: number
}

export type BarMarker = {
  index: number
  label: string
}

export type BarState = {
  values: number[]

  // coloring
  colorByIndex: (i: number) => string

  // overlays
  splitStack?: BarRange[]
  activeRange?: BarRange | null

  // markers
  markers?: {
    top?: BarMarker[]
    bottom?: BarMarker[]
  }
}
