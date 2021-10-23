import React, { Dispatch, SetStateAction, FunctionComponent } from 'react'

interface ScoreCardProps {
  found: any[]
  stash: any[]
  gameStatus: boolean
  setSelected: Dispatch<SetStateAction<string>>
  len: string
}

const ScoreCard: FunctionComponent<ScoreCardProps> = (props: ScoreCardProps) => {
  console.log('yoyoyo')
  const foundLabels: any[] = []
  const wordLabels: any[] = [];
  [...props.found].forEach((word, i) => {
    foundLabels.push(
      <span
        className="label label-warning"
        key={i}
        onMouseEnter={() => props.setSelected(word)}
        onMouseLeave={() => props.setSelected('')}
      >
        {word}
      </span>, ' ',
    )
  })

  if (!props.gameStatus) {
    [...props.stash].forEach((word, i) => {
      if (![...props.found].includes(word)) {
        wordLabels.push(
          <span
            className="label label-default"
            key={i}
            onMouseEnter={() => props.setSelected(word)}
            onMouseLeave={() => props.setSelected('')}
          >
            {word}

          </span>, ' ',
        )
      }
    })
  }

  const percentage = Math.floor(([...props.found].length / [...props.stash].length) * 100)

  return (
    <div className="panel score-card animated slideInRight">
      <div className="panel-heading">
        {props.len}
        -letter
      </div>
      <div className="panel-body">
        <div className="progress">
          <div
            className="progress-bar progress-bar-primary"
            role="progressbar"
            style={{ width: `${percentage}%` }}
          >
            {percentage}
            %
          </div>
        </div>
        {foundLabels}
        {wordLabels}
      </div>
    </div>
  )
}

export default ScoreCard
