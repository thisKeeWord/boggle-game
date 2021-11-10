window.jQuery = window.$ = require('jquery')
import React, { Component } from 'react'
import io from 'socket.io-client'
import Immutable from 'immutable'
import Controls from '../../components/Controls'
import Selection from '../../components/Selection'
import Score from '../../components/Score'
import { dice } from '../../../constants'

import './styles.scss'

const socket = io()
const queryBoard = location.search.slice(7)

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      letters: [],
      selected: '',
      wordsCache: Immutable.Set(),
      wordsFound: Immutable.Set(),
      start: null,
      gameStart: true,
    }
  }

  componentWillMount() {
    socket.on('letters', (letters) => {
      this.setState({ letters: letters })
    })

    socket.on('solution', (stash) => {
      this.setState({
        wordsCache: Immutable.Set(stash)
      })
    })

    if (queryBoard) {
      socket.emit('join', queryBoard)
      socket.on('startGame', () => this.startGame(false))
    }
  }

  setSelected = (selected) => {
    this.setState({
      selected
    })
  }

  pushFound = (newWord) => {
    const newFound = this.state.wordsFound.add(newWord)

    this.setState({
      wordsFound: newFound
    })
  }

  // roll the dice to create the board of letters
  startMultiplayer = () => {
    function roll(dice) {
      const diceIndex = Math.floor(Math.random() * dice.length)
      const die = dice.splice(diceIndex, 1)[0]
      const stringIndex = Math.floor(Math.random() * die.length)

      return die[stringIndex]
    }

    let lettersUrl = ''
    for (let i = 0; i < 25; i++) {
      lettersUrl += roll(dice)
    }

    location.replace('/?board=' + lettersUrl)
  }

  startGame = (startOtherPlayersGames) => {
    socket.emit('start', {
      letters: queryBoard,
      startOtherPlayersGames
    })

    this.setState({
      start: Date.now(),
      wordsFound: Immutable.Set(),
      gameStart: false
    })
  }

  gameOver = (gameStatus) => {
    this.setState({
      gameStart: gameStatus
    })
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6 col-sm-7">
            <Controls
              start={this.state.start}
              gameStart={this.state.gameStart}
              startGame={this.startGame}
              gameOver={this.gameOver}
            />

            <Selection
              setSelected={this.setSelected}
              letters={this.state.letters}
              selected={this.state.selected}
              wordsCache={this.state.wordsCache}
              wordsFound={this.state.wordsFound}
              gameStart={this.state.gameStart}
              setSelected={this.setSelected}
              pushFound={this.pushFound}
            />

            {this.state.gameStart && (
              <div className="btn-multiplayer">
                <button
                  className="btn btn-sm btn-primary btn3d"
                  onClick={() => this.startMultiplayer()}
                >
                  New Multiplayer Game
              </button>
              </div>
            )}
          </div>

          <div className="col-md-6 col-sm-5">
            <Score
              wordsCache={this.state.wordsCache}
              wordsFound={this.state.wordsFound}
              gameStart={this.state.gameStart}
              setSelected={this.setSelected}
            />
          </div>
        </div>
      </>
    )
  }
}
