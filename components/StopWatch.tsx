import { useEffect, useState } from "react";
import useInterval from "./useInterval";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopWatchProps {
  submitAnswers: () => void;
}

const Stopwatch: React.FC<StopWatchProps> = ({ submitAnswers }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useInterval(() => setSecondsElapsed(secondsElapsed + 1), 1000);

  useEffect(() => {
    if (secondsElapsed === 300) {
      submitAnswers();
    }
  });

  return (
    <div className="div-timer">
      <h2>{formattedSeconds(secondsElapsed)}</h2>
    </div>
  );
};

export default Stopwatch;
