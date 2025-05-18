import { useState, useRef, useEffect } from "react";

interface UseTimerProps {
  onExpire: () => void;
  autoStart?: boolean;
  expiryTimestamp: Date;
}

interface TimerReturnType {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
  setTimer: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
}

export default function useTimer({
  onExpire,
  autoStart = true,
  expiryTimestamp,
}: UseTimerProps): TimerReturnType {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<() => void>(onExpire);
  const expiryTimestampRef = useRef<Date>(expiryTimestamp);

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const distance = expiryTimestampRef.current.getTime() - now;

    if (distance <= 0) {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      savedCallback.current();
      return;
    }

    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(calculateTimeRemaining, 1000);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  const resume = () => start();

  const restart = (newExpiryTimestamp: Date, newAutoStart = true) => {
    pause();
    expiryTimestampRef.current = newExpiryTimestamp;
    if (newAutoStart) {
      start();
    }
  };

  const setTimer = (newExpiryTimestamp: Date, newAutoStart = true) => {
    expiryTimestampRef.current = newExpiryTimestamp;
    calculateTimeRemaining();
    if (newAutoStart) {
      start();
    }
  };

  // Update callback ref when onExpire changes
  useEffect(() => {
    savedCallback.current = onExpire;
  }, [onExpire]);

  // Setup timer on mount
  useEffect(() => {
    calculateTimeRemaining();
    if (autoStart) {
      start();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
    setTimer,
  };
}
