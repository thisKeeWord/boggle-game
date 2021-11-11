import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Board from './pages/Board'
import Instructions from './pages/Instructions'

import './index.scss'
import About from './pages/About'

const Game = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Board} />
        <Route path="/?board=:board" exact component={Board} />
        <Route path="/how-to-play" component={Instructions} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>

    <footer className="bg-primary">
      <a href="/" rel="noopener noreferrer">Home</a>
      &#183;
      <a href="/how-to-play" rel="noopener noreferrer">How To Play</a>
      &#183;
      <a href="/about" rel="noopener noreferrer">About</a>
    </footer>
  </div >
)

render(<Game />, document.getElementById('boggle'))
