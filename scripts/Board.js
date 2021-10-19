window.jQuery = window.$ = require('jquery');
import React, { Component } from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
import Controls from './Controls';
import Selection from './Selection';
import Score from './Score';
const socket = io();
window.query = new URLSearchParams(location.search.slice(1));
if (query.board && query.board.length !== 25) delete query.board;

const dice = [
  'AAEEGN', 'ABBJOO', 'ACHOPS', 'AFFKPS',
  'AOOTTW', 'CIMOTU', 'DEILRX', 'DELRVY',
  'DISTTY', 'EEGHNW', 'EEINSU', 'EHRTVW',
  'EIOSST', 'ELRTTY', 'HIMNUQ', 'HLNNRZ',
];

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      letters: [],
      selected: '',
      stash: Immutable.Set(),
      found: Immutable.Set(),
      start: null,
      gameStatus: true,
    };
  }

  componentWillMount() {
    socket.on('letters', letters => {
      this.setState({ letters: letters })
    });

    socket.on('solution', stash => this.setState({ stash: Immutable.Set(stash) }));
    if (query.board) {
      socket.emit('join', query.board);
      socket.on('startGame', () => this.startGame(false));
    }
  }

  setSelected(selected) {
    this.setState({
      selected: selected
    });
  }

  pushFound(newWord) {
    var newFound = this.state.found.add(newWord);
    this.setState({
      found: newFound
    });
  }

  startMultiplayer() {
    function roll(dice) {
      let diceIndex = Math.floor(Math.random() * dice.length);
      let die = dice.splice(diceIndex, 1)[0];
      let stringIndex = Math.floor(Math.random() * die.length);
      return die[stringIndex];
    }
    var letters = '';
    for (var i = 0; i < 16; i++) {
      letters += roll(dice);
    }
    location.replace('/?board=' + letters);
  }

  startGame(startOtherPlayersGames) {
    socket.emit('start', {
      letters: query.board,
      startOtherPlayersGames
    });
    this.setState({
      start: Date.now(),
      found: Immutable.Set(),
      gameStatus: false
    });
  }

  gameOver(gameStatus) {
    this.setState({
      gameStatus: gameStatus
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-7">
          <Controls letters={this.state.letters} selected={this.state.selected} stash={this.state.stash} found={this.state.found} start={this.state.start} gameStatus={this.state.gameStatus} startGame={this.startGame.bind(this)} gameOver={this.gameOver.bind(this)} />
          <button onClick={this.startMultiplayer} className="btn btn-sm btn-primary btn3d">Multiplayer</button>
          <Selection setSelected={this.setSelected.bind(this)} letters={this.state.letters} selected={this.state.selected} stash={this.state.stash} found={this.state.found} start={this.state.start} gameStatus={this.state.gameStatus} setSelected={this.setSelected.bind(this)} pushFound={this.pushFound.bind(this)} />
        </div>
        <div className="col-md-6 col-sm-5">
          <Score letters={this.state.letters} selected={this.state.selected} stash={this.state.stash} found={this.state.found} start={this.state.start} gameStatus={this.state.gameStatus} setSelected={this.setSelected.bind(this)} />
        </div>
      </div>
    )
  }
}

