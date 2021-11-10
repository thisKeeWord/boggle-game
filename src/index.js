import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Board from './pages/Board'
import Instructions from './pages/Instructions'

import './index.scss'

const Game = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Board} />
        <Route path="/?board=:board" exact component={Board} />
        <Route path="/how-to-play" component={Instructions} />
      </Switch>
    </Router>

    <footer className="bg-primary">
      <a href="/" rel="noopener noreferrer">Home</a>
      <a href="/how-to-play" rel="noopener noreferrer">How To Play</a>
      {/* <span>Contact</span> */}
      {/* <span>About Me</span> */}
    </footer>
  </div >
)

render(<Game />, document.getElementById('boggle'))
