import React, { Component } from 'react'
import ScoreCard from './ScoreCard'
import Immutable from 'immutable'
const is = Immutable.is
const _ = {
  groupBy: require('lodash/groupBy'),
}

export default class Score extends Component {
  constructor() {
    super()
    this.state = {
      points: {
        '3': 1,
        '4': 1,
        '5': 2,
        '6': 3,
        '7': 5,
        '8': 11,
        '9': 18,
        '10': 25
      }
    }
  }
  shouldComponentUpdate(props) {
    return this.props.stash.size !== props.stash.size || !is(this.props.found, props.found) || this.props.gameStatus !== props.gameStatus
  }

  render() {
    let foundGroups = _.groupBy([...this.props.found], word => Math.min(word.length, 10)),
      wordGroups = _.groupBy([...this.props.stash], word => Math.min(word.length, 10)),
      scoreCards = [],
      score = 0
    for (let key in wordGroups) {
      if (foundGroups[key]) { score += this.state.points[key] * foundGroups[key].length }
      scoreCards.push(<ScoreCard len={key} key={key} found={foundGroups[key] || []} stash={wordGroups[key]} gameStatus={this.props.gameStatus} setSelected={this.props.setSelected} />)
    }
    return (
      <div className="score">
        <h1>Score: {score}</h1>
        {scoreCards}
      </div>
    )
  }
}