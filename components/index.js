import React from 'react'
import { render } from 'react-dom'
import Board from './Board'

import './index.scss'

// add component containing navbar and Board component
// use bootstrap navbar with custom styles to pop out hamburger menu
// OR
// build nav bar and turns into hamburger menu when smaller screen
// - https://www.npmjs.com/package/react-burger-menu
// - https://codepen.io/erikterwan/pen/EVzeRP

render(<Board />, document.getElementById('boggle'))
