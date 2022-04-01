import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import API from "../services/API";
import Timer from "./Timer/Timer2";
import Asset from "./Image/Asset";

export default function UpcomingDrops() {
  const OwlCarousel = dynamic(import("react-owl-carousel3"));
  const [display, setDisplay] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState([]);

  const options = {
    loop: true,
    margin: 0,
    nav: true,
    mouseDrag: true,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    navText: [
      "<div class='nav-btn-left'><i class='ri-arrow-left-s-line'></i></div>",
      "<div class='nav-btn-right'><i class='ri-arrow-right-s-line'></i></div>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    let time = Date.now();
    let data = {
      page: 0,
      sort: { "dropDetails.liveAt": 1 },
      filter: {
        isDrop: true,
        "dropDetails.liveAt": { $gte: time },
      },
    };
    setisLoading(true);
    API.getAllCollectiables(data)
      .then((response) => {
        setlist(response?.data?.result);
        setDisplay(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  }, []);

  if (list.length < 5) return null;

  return (
    <div className="bg-darker font-gordita pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title-area mb-4">
              <h2>Upcoming Drops</h2>
              <p>
                Derspiciatis unde omnis iste natus error sit voluptatem
                accusantiu.
              </p>
            </div>
            <div className="nft-container">
              <OwlCarousel {...options}>
                {list.map((value, index) => (
                  <Card value={value} index={index} />
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ value, index }) {
  value.auctionEndAt = value.dropDetails.liveAt;
  return (
    <Link key={`upcoming_drop_${index}`} href={`/asset/${value?.tokenId}`}>
      <div
        key={`upcoming_drop_${index}`}
        id={`upcoming_drop_${index}`}
        role="button"
        // style={{
        //   backgroundImage: `url(${value?.contentImage})`,
        //   height: "300px",
        //   backgroundRepeat: "no-repeat",
        // }}
        className="nft-card-new"
        style={{ overflow: "hidden" }}
      >
        <Asset
          type={value?.metaData?.type || "image"}
          imageSrc={value?.metaData?.preview}
          thumbnail={value?.metaData?.preview}
          videoSrc={[value?.metaData?.preview]}
          objectFit="cover"
          id={`upcomming-drop-${value?.metaData?.preview}`}
        />
        <div className="timmer">
          <Timer key={`upcoming_drop_time_${index}`} token={value} />
        </div>
      </div>
    </Link>
  );
}
