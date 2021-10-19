window.jQuery = window.$ = require('jquery');
import React, { Component } from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
import Controls from './Controls';
import Selection from './Selection';
import Score from './Score';
const socket = io();
const queryBoard = location.search.slice(7);

const dice = [
  'AAEEGN', 'ABBJOO', 'ACHOPS', 'AFFKPS', 'ANCDEF',
  'AOOTTW', 'CIMOTW', 'DEILRX', 'DELRVQ', 'DFGHIJ',
  'DISTTY', 'EEGHNW', 'EEINSU', 'EHRTVW', 'EIABYQ',
  'EIOSST', 'ELRTTY', 'HIMNUQ', 'HLNNRZ', 'HMNOPX',
  'LAPRAS', 'XYABCR', 'QQZZZZ', 'QQYWXV', 'MARRIE',
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
      console.log('yo')
      this.setState({ letters: letters })
    });

    socket.on('solution', stash => this.setState({ stash: Immutable.Set(stash) }));
    if (queryBoard) {
      socket.emit('join', queryBoard);
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
    for (var i = 0; i < 25; i++) {
      letters += roll(dice);
    }
    location.replace('/?board=' + letters);
  }

  startGame(startOtherPlayersGames) {
    socket.emit('start', {
      letters: queryBoard,
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

