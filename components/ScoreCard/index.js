import React, { Component } from 'react'
import cx from 'classnames'

import './styles.scss'

export default class ScoreCard extends Component {
  render() {
    const wordLabels = []
    const foundLabels = []
    this.props.wordsFound.forEach((word, i) => {
      foundLabels.push(
        <span
          className="label label-success"
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

    const progress = Math.floor(this.props.wordsFound.length / this.props.wordsCache.length * 100)

    console.log(this.props.wordsCache)

    return (
      <div className="panel score-card animated slideInRight">
        <div className="panel-heading">
          {this.props.len}-letter
        </div>
        <div className="panel-body">
          <div>
            <div style={{ width: `calc(${progress}%`, transition: 'width 0.6s', textAlign: 'right' }}>{progress}%</div>
          </div>
          <div className="progress">
            <div
              className={cx("progress-bar", {
                "progress-bar-danger": progress < 12,
                "progress-bar-warning": progress >= 12 && progress < 23,
                "progress-bar-primary": progress >= 23 && progress < 40,
                "progress-bar-success": progress >= 40
              })}
              role="progressbar"
              style={{ width: `${progress}%`, height: '20px' }}
            />
          </div>
          {foundLabels}
          {wordLabels}
        </div>
      </div>
    )
  }
}
