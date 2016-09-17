import React, {Component} from 'react';
let pid, prevTick;

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      remaining: 240000
    };
  }

  componentDidUpdate() {
    if (!this.props.start || pid) return;
    if (this.props.gameStatus) { this.setState({ remaining: 240000 }); }
    if (this.state.remaining <= 0) {
      this.props.gameOver(true);
      return pid = null;
    }
    // this is a weird looking timeout right? shouldn't it just be 1000ms? If you set it to 1000 then it will be around 1002 to 1006 because it has to wait for the event loop.
    // I'm correcting for this by measuring how long it was since the previous tick, so if it took 1006ms the previous time, wait only 994ms this time.
    let timeout;
    let timeDiff = Date.now() - prevTick;
    timeDiff > 1000 ? timeout = 2000 - timeDiff : timeout = 1000;
    prevTick = Date.now();
    pid = setTimeout(() => {
      pid = null;
      this.setState({ remaining: this.state.remaining - 1000 });
    }, timeout);
  }

  convertTime(milli) {
    let seconds = milli / 1000;
    let minutes = Math.floor(seconds / 60).toString();
    seconds = Math.floor(seconds % 60).toString();
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div className="clock">
        {this.convertTime(this.state.remaining)}
      </div>
    )
  }
}


