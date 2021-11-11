import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'


export default class FourOhFour extends Component {
  render() {
    return (
      <div className="fourOhFour-container">
        <div className="col-md-6 col-sm-8 fourOhFour">
          It looks like you have reached the end of Boggle5. You can return <Link to="/" rel="noopener noreferrer">home</Link>.
        </div>
      </div>
    )
  }
}
