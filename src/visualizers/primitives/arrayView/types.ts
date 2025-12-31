export type ArrayCellMarker = {
  index: number
  label?: string
}

export type ArrayVisualProps = {
  values: number[]

  /** color resolver per index */
  colorByIndex: (index: number) => string

  /** optional markers */
  markers?: {
    top?: ArrayCellMarker[]
    bottom?: ArrayCellMarker[]
  }
}
