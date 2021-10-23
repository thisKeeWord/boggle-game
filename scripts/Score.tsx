import React, {
  Dispatch, FunctionComponent, memo, SetStateAction,
} from 'react'
import Immutable from 'immutable'
import { groupBy } from 'lodash'
import ScoreCard from './ScoreCard'

const is = Immutable.is
const points = {
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
  9: 18,
  10: 25,
}

interface ScoreProps {
  stash: Set<any>
  found: Set<any>
  gameStatus: boolean
  setSelected: Dispatch<SetStateAction<string>>
}

const Score: FunctionComponent<ScoreProps> = (props: ScoreProps) => {
  const foundGroups = groupBy([...props.found], (word) => Math.min(word.length, 10))
  const wordGroups = groupBy([...props.stash], (word) => Math.min(word.length, 10))

  console.log(wordGroups, 'wordGroup')
  const scoreCards: any[] = []
  let score = 0
  // eslint-disable-next-line no-restricted-syntax, prefer-const, guard-for-in
  for (let key in wordGroups) {
    if (foundGroups[key]) {
      score += points[key] * foundGroups[key].length
    }

    scoreCards.push(
      <ScoreCard
        len={key}
        key={key}
        found={foundGroups[key] || []}
        stash={wordGroups[key]}
        gameStatus={props.gameStatus}
        setSelected={props.setSelected}
      />,
    )
  }

  return (
    <div className="score">
      <h1>
        Score:
        {' '}
        {score}
      </h1>
      {scoreCards}
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  console.log(prevProps, 'prev')
  console.log(nextProps, 'next')
  console.log(nextProps.stash.size !== prevProps.stash.size,
    !is(nextProps.found, prevProps.found),
    nextProps.gameStatus !== prevProps.gameStatus)
  return (
    nextProps.stash.size !== prevProps.stash.size
    || !is(nextProps.found, prevProps.found)
    || nextProps.gameStatus !== prevProps.gameStatus
  )
}

export default memo(Score, areEqual)
