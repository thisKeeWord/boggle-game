declare global {
  interface Window { 
    jQuery: any; 
    $: any;
  }
}

window.jQuery = window.$ = require('jquery');
import React, {  FunctionComponent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
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

const Board: FunctionComponent = () => {
  const [letters, setLetters] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')
  const [stash, setStash] = useState(Immutable.Set())
  const [found, setFound] = useState(Immutable.Set())
  const [start, setStart] = useState<number>()
  const [gameStatus, setGameStatus] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)

  if (!mounted) {
    socket.on('letters', (letters) => {
      setLetters(letters)
    });

    socket.on('solution', (stash) => {
      setStash(Immutable.Set(stash));
    })

    if (queryBoard) {
      socket.emit('join', queryBoard);
      socket.on('startGame', () => {
        startGame(false);
      })
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const pushFound = (newWord): void =>{
    const newFound = found.add(newWord);
    setFound(newFound)
  }

  const startMultiplayer = (): void => {
    const roll = (dice): string =>{
      let diceIndex = Math.floor(Math.random() * dice.length);
      let die = dice.splice(diceIndex, 1)[0];
      let stringIndex = Math.floor(Math.random() * die.length);

      return die[stringIndex];
    }

    let lettersStore = '';
    for (let i = 0; i < 25; i++) {
      lettersStore += roll(dice);
    }

    location.replace('/?board=' + lettersStore);
  }

  const startGame = (startOtherPlayersGames): void => {
    socket.emit('start', {
      letters: queryBoard,
      startOtherPlayersGames
    });

    setStart(Date.now()),
    setFound(Immutable.Set())
    setGameStatus(false)
  }

  const gameOver = (gameStatus: boolean): void => {
    setGameStatus(gameStatus)
  }

  return (
    <div className="row">
      <div className="col-md-6 col-sm-7">
        <Controls letters={letters} selected={selected} stash={stash} found={found} start={start} gameStatus={gameStatus} startGame={startGame} gameOver={gameOver} />
        <button onClick={startMultiplayer} className="btn btn-sm btn-primary btn3d">Multiplayer</button>
        <Selection setSelected={setSelected} letters={letters} selected={selected} stash={stash} found={found} start={start} gameStatus={gameStatus} pushFound={pushFound} />
      </div>
      <div className="col-md-6 col-sm-5">
        <Score letters={letters} selected={selected} stash={stash} found={found} start={start} gameStatus={gameStatus} setSelected={setSelected} />
      </div>
    </div>
  )
}

export default Board