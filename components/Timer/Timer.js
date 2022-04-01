import React, { useState, useEffect } from "react";

export default function Timer({ token }) {
  const [isAuction, setisAuction] = useState(true);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const comingSoonTime = () => {
    let endTime = new Date(token?.auctionEndAt);
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let countdays = Math.floor(timeLeft / 86400);
    let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    let countminutes = Math.floor(
      (timeLeft - countdays * 86400 - counthours * 3600) / 60
    );
    let countseconds = Math.floor(
      timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
    );
    if (counthours < "10") {
      counthours = "0" + counthours;
    }
    if (countminutes < "10") {
      countminutes = "0" + countminutes;
    }
    if (countseconds < "10") {
      countseconds = "0" + countseconds;
    }

    setDays(countdays);
    setHours(counthours);
    setMinutes(countminutes);
    setSeconds(countseconds);
  };

  useEffect(() => {
    let interval;
    if (Date.now() < token?.auctionEndAt) {
      comingSoonTime();
      interval = setInterval(() => {
        if (Date.now() > token?.auctionEndAt) {
          clearInterval(interval);
          setisAuction(false);
          return;
        }
        if (!isAuction) setisAuction(true);
        comingSoonTime();
      }, 1000);
    } else {
      setisAuction(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  if (!isAuction) return null;

  return (
    <>
      {days}:{hours}:{minutes}:{seconds}
    </>
  );
}
