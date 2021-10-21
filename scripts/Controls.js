import React, { Component } from 'react';
import Clock from './Clock';

export default class Controls extends Component {
  pressStart() {
    this.props.startGame(true);
  }

  render() {
    let button = null;
    this.props.gameStatus ? button = (<button id="start" className="btn btn3d btn-primary btn-sm" style={{ backgroundColor: "brown" }} onClick={this.pressStart.bind(this)}>{' '}Start</button>) : button = (<button id="start" className="btn btn3d btn-primary btn-sm" style={{ backgroundColor: "brown" }} onClick={() => this.props.gameOver(true)}>{' '}Stop/Reveal</button>);
    return (
      <div className="buttonsAndStuff">
        <Clock start={this.props.start} gameOver={this.props.gameOver} gameStatus={this.props.gameStatus} />
        { button}
      </div>
    );
  }
}

