import { useState, useEffect } from 'react';

export const useTimer = (initialHours: number = 4) => {
  const [timeLeft, setTimeLeft] = useState(initialHours * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return initialHours * 60 * 60; // Reset
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialHours]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const pad = (n: number) => n < 10 ? `0${n}` : n;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return formatTime(timeLeft);
};