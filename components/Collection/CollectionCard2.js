import { useState, useEffect } from "react";
import Link from "next/link";

const CollectionCard = () => {
  //counter calculation
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const comingSoonTime = () => {
    let endTime = new Date("December 23, 2021 17:00:00 PDT");
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
    setInterval(() => {
      comingSoonTime();
    }, 1000);
  }, []);

  return (
    <div className="featured-card box-shadow">
      <div className="featured-card-img">
        <Link href="asset">
          <a>
            <img src="../images/featured/featured-img2.jpg" alt="Images" />
          </a>
        </Link>
        <p>
          <i className="ri-heart-line"></i> 142
        </p>
        <div className="featured-card-clock" data-countdown="2021/10/10">
          {days}:{hours}:{minutes}:{seconds}
        </div>
        <button type="button" className="default-btn border-radius-5">
          Place Bid
        </button>
      </div>

      <div className="content">
        <h3>
          <Link href="asset">
            <a>I Love In The Air</a>
          </Link>
        </h3>
        <div className="content-in">
          <div className="featured-card-left">
            <span>110 ETH 12/14</span>
            <h4>Bid 70 ETH </h4>
          </div>

          <Link href="asset">
            <a className="featured-content-btn">
              <i className="ri-arrow-right-line"></i>
            </a>
          </Link>
        </div>
        <Link href="/author-profile">
          <a className="featured-user-option">
            <img src="../images/featured/featured-user2.jpg" alt="Images" />
            <span>Created by @Adison</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
