import React, { FunctionComponent } from 'react'
import Clock from './Clock'

interface ControlsProps {
  gameStatus: boolean
  start: number
  // eslint-disable-next-line no-unused-vars
  startGame: (startOtherPlayersGames: boolean) => void
  // eslint-disable-next-line no-unused-vars
  gameOver: (gameStatus: boolean) => void
}

const Controls: FunctionComponent<ControlsProps> = (props: ControlsProps) => (
  <div className="buttonsAndStuff">
    <Clock start={props.start} gameOver={props.gameOver} gameStatus={props.gameStatus} />
    {props.gameStatus ? (
      <button
        id="start"
        className="btn btn3d btn-primary btn-sm"
        style={{ backgroundColor: 'brown' }}
        onClick={() => props.startGame(true)}
      >
        {' '}
        Start
      </button>
    ) : (
      <button id="start" className="btn btn3d btn-primary btn-sm" style={{ backgroundColor: 'brown' }} onClick={() => props.gameOver(true)}>
        {' '}
        Stop/Reveal
      </button>
    )}
  </div>
)

export default Controls
