import React, {
  FunctionComponent, useEffect, useRef, useState,
} from 'react'

let idle
let prevTick

const totalTime = 420000

interface ClockProps {
  start: number
  gameStatus: boolean
  // eslint-disable-next-line no-unused-vars
  gameOver: (gameStatus: boolean) => void
}

const Clock: FunctionComponent<ClockProps> = (props: ClockProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(totalTime)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (!props.start || idle) {
        return
      }

      if (props.gameStatus) {
        setTimeLeft(totalTime)
      }

      if (timeLeft <= 0) {
        props.gameOver(true)
        idle = null

        return
      }

      /**
       * Odd timeout because...
       * If you set it to 1000, it will be around 1002ms to 1006ms because it has to wait for the event loop.
       * Fixed by measuring how long it was since the previous tick,
       * so if it previously took 1006ms, this time it will be 994ms.
      * */
      let timeout = 0
      const timeDiff = Date.now() - prevTick
      timeDiff > 1000 ? timeout = 2000 - timeDiff : timeout = 1000
      prevTick = Date.now()
      idle = setTimeout(() => {
        idle = null
        setTimeLeft(timeLeft - 1000)
      }, timeout)
    }
  })

  const convertTime = (milli): string => {
    const seconds = milli / 1000
    const minutes = Math.floor(seconds / 60).toString()
    let stringSeconds = Math.floor(seconds % 60).toString()
    if (stringSeconds.length === 1) {
      stringSeconds = `0${stringSeconds}`
    }
    return `${minutes}:${stringSeconds}`
  }

  return (
    <div className="clock">
      {convertTime(timeLeft)}
    </div>
  )
}

export default Clock
