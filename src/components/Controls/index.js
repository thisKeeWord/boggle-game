import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Clock from '../Clock'

import './styles.scss'

export default class Controls extends Component {
  render() {
    return (
      <div className="buttons-and-clock">
        <div className="initial-buttons">
          <button
            id="start"
            className="btn btn3d btn-primary btn-sm start"
            onClick={() => this.props.gameEnd ? this.props.startGame(true) : this.props.gameOver(true)}
          >
            {this.props.gameEnd ? "Begin" : "End"}
          </button>

          {this.props.gameEnd && (
            <Link
              to="/how-to-play"
              className="btn btn-sm btn-primary btn3d instructions"
              title="How to Play"
            >
              ?
            </Link>
          )}
        </div>

        <Clock start={this.props.start} gameOver={this.props.gameOver} gameEnd={this.props.gameEnd} />
      </div>
    )
  }
}
