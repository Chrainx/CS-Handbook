'use client'

type SearchArrayProps = {
  values: number[]
  low: number | null
  high: number | null
  mid: number | null
  foundIndex: number | null
}

export default function SearchArray({
  values,
  low,
  high,
  mid,
  foundIndex,
}: SearchArrayProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: '4px solid black',
        width: 'fit-content',
      }}
    >
      {values.map((value, index) => {
        const inRange =
          low !== null && high !== null && index >= low && index <= high
        const isMid = index === mid
        const isFound = index === foundIndex
        const eliminated =
          low !== null && high !== null && !inRange && foundIndex === null

        let bgColor = 'white'
        let textColor = 'black'

        if (eliminated) {
          bgColor = '#e5e7eb'
          textColor = '#9ca3af'
        } else if (isFound) {
          bgColor = '#22c55e'
          textColor = 'white'
        } else if (isMid) {
          bgColor = '#3b82f6'
          textColor = 'white'
        }

        return (
          <div
            key={index}
            style={{
              height: '64px',
              width: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 'bold',
              backgroundColor: bgColor,
              color: textColor,
              borderRight:
                index === values.length - 1 ? 'none' : '4px solid black',
            }}
          >
            {value}
          </div>
        )
      })}
    </div>
  )
}
