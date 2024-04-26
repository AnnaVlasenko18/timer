import { useRef } from "react";
import { useState } from "react";

import ResultMtodal from "./ResultModal";

export default function TimerChallenger({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaing, setTimeRemaing] = useState(targetTime * 1000);

  const timerIsActive = timeRemaing > 0 && timeRemaing < targetTime * 1000;

  if (timeRemaing <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaing(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaing((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultMtodal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaing}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
