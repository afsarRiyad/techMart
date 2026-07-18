import { useEffect, useState } from "react";

export const useTimers = (time) => {
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Date.now();
      const targetTime = new Date(time).getTime();
      const distance = targetTime - currentTime;

      if (distance <= 0) {
        setDate({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setDate({
        days,
        hours,
        minutes,
        seconds,
      });
    };
    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return date;
};