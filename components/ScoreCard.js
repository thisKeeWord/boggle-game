import React, { Component } from 'react'

export default class ScoreCard extends Component {
  render() {
    const wordLabels = []
    const foundLabels = this.props.wordsFound.map((word, i) => {
      return (
        <span
          className="label label-warning"
          key={i}
          onMouseEnter={() => this.props.setSelected(word)}
          onMouseLeave={() => this.props.setSelected('')}
        >
          {word}
        </span>
        , ' ')
    })

    if (this.props.gameStart) {
      this.props.wordsCache.map((word, i) => {
        if (!this.props.wordsFound.includes(word)) {
          wordLabels.push(
            <span
              className="label label-default"
              key={i}
              onMouseEnter={() => this.props.setSelected(word)}
              onMouseLeave={() => this.props.setSelected('')}
            >
              {word}
            </span>
            , ' ')
        }
      })
    }
    const percentage = Math.floor(this.props.wordsFound.length / this.props.wordsCache.length * 100)

    return (
      <div className="panel score-card animated slideInRight">
        <div className="panel-heading">
          {this.props.len}-letter
        </div>
        <div className="panel-body">
          <div className="progress">
            <div className="progress-bar progress-bar-primary" role="progressbar" style={{ width: `${percentage}%` }}>
              {percentage}%
            </div>
          </div>
          {foundLabels}
          {wordLabels}
        </div>
      </div>
    )
  }
}