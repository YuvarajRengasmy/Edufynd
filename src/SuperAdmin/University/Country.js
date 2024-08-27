import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MeetingCountdownTimer = ({ meetingTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(meetingTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        <div className="timer">
          Meeting starts in: {timerComponents}
        </div>
      ) : (
        <div className="timer">
          The meeting has started or the time is invalid.
        </div>
      )}
      <Link to="/list_meetings">
        <button className="btn btn-primary mt-3">Go to Meetings List</button>
      </Link>
    </div>
  );
};

export default MeetingCountdownTimer;
