import React, { Component } from 'react'
import { totalTime } from '../constants'
let idle
let prevTick



export default class Clock extends Component {
  constructor() {
    super()
    this.state = {
      timeLeft: totalTime
    }
  }

  componentDidUpdate() {
    if (!this.props.start || idle) {
      return
    }

    if (this.props.gameStart) {
      this.setState({
        timeLeft: totalTime
      })
    }

    if (this.state.timeLeft <= 0) {
      this.props.gameOver(true)
      return idle = null
    }
    /**
     * Odd timeout because...
     * If you set it to 1000, it will be around 1002ms to 1006ms because it has to wait for the event loop.
     * Fixed by measuring how long it was since the previous tick,
     * so if it previously took 1006ms, this time it will be 994ms.
    **/
    let timeout = 0
    let timeDiff = Date.now() - prevTick

    if (timeDiff > 1000) {
      timeout = 2000 - timeDiff
    } else {
      timeout = 1000
    }

    prevTick = Date.now()
    idle = setTimeout(() => {
      idle = null
      this.setState({
        timeLeft: this.state.timeLeft - 1000
      })
    }, timeout)
  }

  convertTime = (milli) => {
    let seconds = milli / 1000
    let minutes = Math.floor(seconds / 60).toString()

    seconds = Math.floor(seconds % 60).toString()

    if (seconds.length === 1) {
      seconds = '0' + seconds
    }

    return `${minutes}:${seconds}`
  }

  render() {
    return (
      <div className="clock">
        {this.convertTime(this.state.timeLeft)}
      </div>
    )
  }
}


