import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Board from './pages/Board'

import './index.scss'

const Game = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Board} />
      <Route path="/?board=:board" exact component={Board} />

      {/* <Route path="/how-to-play" component={FourOhFour} /> */}
    </Switch>
  </Router>
)

render(<Game />, document.getElementById('boggle'))
