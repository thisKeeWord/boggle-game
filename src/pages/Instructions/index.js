import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'


export default class Instructions extends Component {
  render() {
    return (
      <div className="instructions-container">
        <div className="col-md-6 col-sm-8 instructions">
          <p className="about-boggle">
            <strong>Boggle5</strong> is based off of the classic <Link to="https://en.wikipedia.org/wiki/Boggle" target="_blank" rel="noopener noreferrer">Boggle game</Link>.
          The goal is to find as many words as you can until the timer runs out.
          These words that only can be made from letters adjacent tiles - top, right, bottom, left, and diagonal.
          The same letter tile cannot be used more than once in a given word.
          Words must be at least three letters long and cannot be reused.
        </p>

          <p className="about-buttons">
            The buttons should generally self-explanatory. However the button next to the input field has 3 different states:
          <img src="../../../images/pending.png" /> (pending),
          <img src="../../../images/valid.png" /> (valid),
          and
          <img src="../../../images/warning.png" /> (warning).
          The "pending" button indicates the input or word is in a neutral state.
          The "valid" button indicates the word is valid and can be submitted for points.
          The "warning" button indicates the word has already been submitted.
          Though the 3 buttons are clickable, only the "valid" button's click has an effect.
          The word can also be submitted by clicking the "Enter" key on your keyboard.
        </p>

          <p>
            Off you go to find as many words as you can! Click <Link to="/" rel="noopener noreferrer">here</Link> to return home.
        </p>
        </div>
      </div>
    )
  }
}
