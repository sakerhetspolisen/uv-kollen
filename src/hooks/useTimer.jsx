import { useState, useCallback } from "react";
import Time from "@/lib/timeUtils";
import Validate from "@/lib/timeValidator";
import useInterval from "./useInterval";

const DEFAULT_DELAY = 1000;
function getDelayFromExpiryTimestamp(expiryTimestamp) {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }

  const seconds = Time.getSecondsFromExpiry(expiryTimestamp);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
}

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart = true,
} = {}) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(
    Time.getSecondsFromExpiry(expiryTimestamp)
  );
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(
    getDelayFromExpiryTimestamp(expiryTimestamp)
  );

  const handleExpire = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setDelay(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const setTimer = useCallback((newExpiryTimestamp, newAutoStart = true) => {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }, []);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000);
    setTimer(time);
  }, [seconds, setTimer]);

  const start = useCallback(() => {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(secondsValue);
      if (secondsValue <= 0) {
        handleExpire();
      }
    },
    isRunning ? delay : null
  );

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    setTimer,
    isRunning,
  };
}
