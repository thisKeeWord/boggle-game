import React, { FunctionComponent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Controls from './Controls'
import Selection from './Selection'
import Score from './Score'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    jQuery: any
    $: any
  }
}

// eslint-disable-next-line no-multi-assign
window.jQuery = window.$ = require('jquery')

const socket = io()
// eslint-disable-next-line no-restricted-globals
const queryBoard = location.search.slice(7)

const dice = [
  'AAEEGN', 'ABBJOO', 'ACHOPS', 'AFFKPS', 'ANCDEF',
  'AOOTTW', 'CIMOTW', 'DEILRX', 'DELRVQ', 'DFGHIJ',
  'DISTTY', 'EEGHNW', 'EEINSU', 'EHRTVW', 'EIABYQ',
  'EIOSST', 'ELRTTY', 'HIMNUQ', 'HLNNRZ', 'HMNOPX',
  'LAPRAS', 'XYABCR', 'QQZZZZ', 'QQYWXV', 'MARRIE',
]

const Board: FunctionComponent = () => {
  const [letters, setLetters] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')
  const [stash, setStash] = useState<Set<any>>(new Set())
  const [found, setFound] = useState<Set<any>>(new Set())
  const [start, setStart] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)

  if (!mounted) {
    socket.on('letters', (letter) => {
      setLetters(letter)
    })

    socket.on('solution', (stashe) => {
      setStash(new Set(stashe))
    })

    if (queryBoard) {
      socket.emit('join', queryBoard)
      socket.on('startGame', () => {
        startGame(false)
      })
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const pushFound = (newWord): void => {
    const newFound = found.add(newWord)
    setFound(newFound)
  }

  const startMultiplayer = (): void => {
    const roll = (dicer): string => {
      const diceIndex = Math.floor(Math.random() * dicer.length)
      const die = dicer.splice(diceIndex, 1)[0]
      const stringIndex = Math.floor(Math.random() * dicer.length)

      return die[stringIndex]
    }

    let lettersStore = ''
    for (let i = 0; i < 25; i++) {
      lettersStore += roll(dice)
    }

    // eslint-disable-next-line no-restricted-globals
    location.replace(`/?board=${lettersStore}`)
  }

  const startGame = (startOtherPlayersGames): void => {
    socket.emit('start', {
      letters: queryBoard,
      startOtherPlayersGames,
    })

    setStart(Date.now())
    setFound(new Set())
    setGameStatus(false)
  }

  const gameOver = (status: boolean): void => {
    setGameStatus(status)
  }

  return (
    <div className="row">
      <div className="col-md-6 col-sm-7">
        <Controls start={start} gameStatus={gameStatus} startGame={startGame} gameOver={gameOver} />
        <button onClick={startMultiplayer} className="btn btn-sm btn-primary btn3d">Multiplayer</button>
        <Selection
          setSelected={setSelected}
          letters={letters}
          selected={selected}
          stash={stash}
          found={found}
          start={start}
          gameStatus={gameStatus}
          pushFound={pushFound}
        />
      </div>
      <div className="col-md-6 col-sm-5">
        <Score
          stash={stash}
          found={found}
          gameStatus={gameStatus}
          setSelected={setSelected}
        />
      </div>
    </div>
  )
}

export default Board
