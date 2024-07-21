import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import useTimer from "./hooks/useTimer";

function App() {
  const Timer = useTimer();

  return (
    <>
      <main className="h-screen flex flex-col justify-evenly items-center gap-5 bg-gradient-to-tr from-slate-300 to-slate-500">
        <div className="text-5xl font-semibold flex gap-2 items-baseline ">
          The{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>{" "}
          Timer
        </div>
        {Timer.isEnded ? (
          <div className="text-white font-semibold text-xl animate-bounce">
            Time Over!
          </div>
        ) : null}
        <div
          className={`flex gap-5 items-center text-xl ${
            Timer.isEnded ? "text-red-500" : "text-black"
          }`}
        >
          <TimeField time={Timer.time.hour} setTime={Timer.setHours} />:
          <TimeField time={Timer.time.min} setTime={Timer.setMinutes} />:
          <TimeField time={Timer.time.sec} setTime={Timer.setSeconds} />
        </div>
        <div className="flex gap-5 ">
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-700 active:scale-95 transition-all duration-1 ease-in-out shadow-lg"
            onClick={() => Timer.start()}
          >
            Start
          </button>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-700 active:scale-95 transition-all duration-1 ease-in-out shadow-lg"
            onClick={() => Timer.stop()}
          >
            Stop
          </button>
          <button
            className="bg-yellow-500 text-white px-5 py-2 rounded-full hover:bg-yellow-700 active:scale-95 transition-all duration-1 ease-in-out shadow-lg"
            onClick={() => Timer.reset()}
          >
            Reset
          </button>
        </div>
      </main>
    </>
  );
}

const TimeField = ({
  time,
  setTime,
}: {
  time: number;
  setTime: (time: number) => void;
}) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const timeInput = Number(e.target.value);
    if (timeInput >= 0) {
      setTime(timeInput);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <button
          onClick={() => {
            setTime(time + 1);
          }}
          className="text-3xl w-10 h-10 text-center  grid place-items-center rounded-full bg-gray-600 text-white  hover:bg-gray-900 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>

        <input
          type="text"
          pattern="[0-9]"
          required
          value={time < 10 ? "0" + time.toFixed(0) : time.toFixed(0)}
          onChange={changeHandler}
          className="min-w-10 max-w-12 text-center text-3xl outline-none font-mono bg-transparent"
        />

        <button
          onClick={() => {
            setTime(time - 1);
          }}
          className="text-3xl w-10 h-10 text-center  grid place-items-center rounded-full bg-gray-600 text-white hover:bg-gray-900 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default App;
