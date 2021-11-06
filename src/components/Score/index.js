import React, { Component } from 'react'
import ScoreCard from '../ScoreCard'
import Immutable from 'immutable'
import { points } from '../../../constants'

import './styles.scss'

const is = Immutable.is
const _ = {
  groupBy: require('lodash/groupBy'),
}

export default class Score extends Component {
  shouldComponentUpdate(props) {
    return this.props.wordsCache.size !== props.wordsCache.size || !is(this.props.wordsFound, props.found) || this.props.gameStart !== props.gameStart
  }

  render() {
    const foundGroups = _.groupBy([...this.props.wordsFound], word => Math.min(word.length, 10))
    const wordGroups = _.groupBy([...this.props.wordsCache], word => Math.min(word.length, 10))
    const scoreCards = []
    let score = 0

    for (let key in wordGroups) {
      if (foundGroups[key]) {
        score += points[key] * foundGroups[key].length
      }

      scoreCards.push(
        <ScoreCard
          len={key}
          key={key}
          wordsFound={foundGroups[key] || []}
          wordsCache={wordGroups[key]}
          gameStart={this.props.gameStart}
          setSelected={this.props.setSelected}
        />
      )
    }

    return (
      <div className="score">
        <h1>Score: {score}</h1>
        {scoreCards}
      </div>
    )
  }
}
