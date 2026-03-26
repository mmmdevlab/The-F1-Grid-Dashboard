import { useState, useEffect } from "react";

const CountDownRace = ({ raceDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(raceDate) - new Date();

      if (difference <= 0) {
        setIsLive(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [raceDate]);

  if (isLive) {
    return <div className="countdown">Race day</div>;
  }

  return (
    <div className="countdown flex col gap-4 flex-wrap grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <h1 className="bg-black px-2 py-1 rounded-lg tracking-widest">
        {timeLeft.days}d
      </h1>
      <h1 className="bg-black px-2 py-1 rounded-lg tracking-widest">
        {timeLeft.hours}h
      </h1>
      <h1 className="bg-black px-2 py-1 rounded-lg tracking-widest">
        {timeLeft.minutes}m
      </h1>
      <h1 className="bg-black px-2 py-1 rounded-lg tracking-widest">
        {timeLeft.seconds}s
      </h1>
    </div>
  );
};

export default CountDownRace;
