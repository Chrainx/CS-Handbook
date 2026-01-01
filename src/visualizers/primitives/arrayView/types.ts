export type ArrayCellMarker = {
  index: number
  label?: string
}

export type ArrayVisualProps = {
  values: number[]

  colorByIndex: (index: number) => string

  markers?: {
    top?: ArrayCellMarker[]
    bottom?: ArrayCellMarker[]
  }
}
