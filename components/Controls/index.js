import React, { Component } from 'react'
import Clock from '../Clock'

import './styles.scss'

export default class Controls extends Component {
  render() {
    return (
      <div className="buttons-and-clock">
        <Clock start={this.props.start} gameOver={this.props.gameOver} gameStart={this.props.gameStart} />

        <button
          id="start"
          className="btn btn3d btn-primary btn-sm"
          style={{ backgroundColor: "brown" }}
          onClick={() => this.props.gameStart ? this.props.startGame(true) : this.props.gameOver(true)}
        >
          {this.props.gameStart ? "Start" : "Stop/Reveal"}
        </button>
      </div>
    )
  }
}

