import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
let idle, prevTick;

const totalTime = 420000

interface ClockProps {
  start: number
  gameStatus: boolean
  gameOver: (gameStatus: boolean) => void
}

const Clock: FunctionComponent<ClockProps> = (props: ClockProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(totalTime)
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (!props.start || idle) {
        return;
      }

      if (props.gameStatus) { 
        setTimeLeft(totalTime) 
      }

      if (timeLeft <= 0) {
        props.gameOver(true);
        idle = null;

        return
      }

      /**
       * This is a weird looking timeout right? 
       * Shouldn't it just be 1000ms? 
       * If you set it to 1000, then it will be around 1002 to 1006 because it has to wait for the event loop.
       * I'm correcting for this by measuring how long it was since the previous tick, 
       * so if it took 1006ms the previous time, wait only 994ms this time.
      **/
      let timeout = 0;
      let timeDiff = Date.now() - prevTick;
      timeDiff > 1000 ? timeout = 2000 - timeDiff : timeout = 1000;
      prevTick = Date.now();
      idle = setTimeout(() => {
        idle = null;
        setTimeLeft(timeLeft - 1000)
      }, timeout);
    }
  })

  const convertTime = (milli): string => {
    const seconds = milli / 1000;
    const minutes = Math.floor(seconds / 60).toString();
    let stringSeconds = Math.floor(seconds % 60).toString();
    if (stringSeconds.length === 1) {
      stringSeconds = '0' + stringSeconds;
    }
    return minutes + ':' + stringSeconds;
  }

  return (
    <div className="clock">
      {convertTime(timeLeft)}
    </div>
  )
}

export default Clock


