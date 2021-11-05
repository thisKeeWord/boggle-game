import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Board from './Board'

import './index.scss'

// add "How To Play" button next to multiplayer button with a link to how to play
// add footer with how to play link and about
// align submit button to input


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
