import React, { Component } from 'react'
import Clock from './Clock'

export default class Controls extends Component {
  pressStart() {
    this.props.startGame(true)
  }

  render() {
    return (
      <div className="buttons-and-clock">
        <Clock start={this.props.start} gameOver={this.props.gameOver} gameStart={this.props.gameStart} />
        {this.props.gameStart ? (
          <button id="start" className="btn btn3d btn-primary btn-sm" style={{ backgroundColor: "brown" }} onClick={this.pressStart.bind(this)}>{' '}Start</button>
        ) : (
          <button id="start" className="btn btn3d btn-primary btn-sm" style={{ backgroundColor: "brown" }} onClick={() => this.props.gameOver(true)}>{' '}Stop/Reveal</button>
        )}
      </div>
    )
  }
}

