import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import API from "../services/API";
import Timer from "./Timer/Timer2";
import Asset from "./Image/Asset";

export default function LiveDrops() {
  const OwlCarousel = dynamic(import("react-owl-carousel3"));
  const [display, setDisplay] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState([]);

  const options = {
    loop: true,
    margin: 0,
    lazyLoad: true,
    lazyContent: true,
    video: true,
    nav: true,
    mouseDrag: true,
    dots: false,
    autoplay: false,
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
    let random = Math.random();
    if (random > 0.5) random = 1;
    else random = -1;
    let random2 = Math.random();
    if (random2 > 0.5) random2 = 1;
    else random2 = -1;
    let data = {
      page: 0,
      sort: {
        name: random2,
        "metaData.preview": random * random2,
        createdAt: 1,
      },
      filter: {
        // isDrop: true,
        // "dropDetails.liveAt": { $lte: time },
      },
      perPage: 22,
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

  return (
    <div className="bg-dark">
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-lg-8 col-md-6">
            <div className="section-title">
              <h2>
                Live Drops{" "}
                <img
                  style={{ height: "30px", width: "30px" }}
                  src="/images/home-v1/fire.svg"
                ></img>
              </h2>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="nft-container">
              <OwlCarousel {...options}>
                {list.map((value, index) => (
                  <Card
                    key={`live-drop-${index}`}
                    value={value}
                    index={index}
                  />
                ))}
              </OwlCarousel>
            </div>
            <div className="trending-btn text-end mt-5">
              {/* <Link href="#">
                <a className="default-btn border-radius-5">
                  See More <i class="ri-arrow-right-line icon"></i>
                </a>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ value, index }) {
  let random = Math.random();
  const isVideo = value?.metaData?.type?.includes("video");
  const _preview =
    isVideo && value?.metaData?.thumbnail
      ? value?.metaData?.thumbnail
      : value?.metaData?.preview;
  return (
    // <Link key={`live_drop_${index}`} href={`/asset/${value?.tokenId}`}>
    <div
      key={`live_drop_${index}`}
      id={`live_drop_${index}_${value?.metaData?.preview}`}
      role="button"
      className="nft-card-new"
      style={{ overflow: "hidden" }}
    >
      <Asset
        type={"image"}
        imageSrc={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview}
        thumbnail={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview}
        videoSrc={[process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview]}
        objectFit="cover"
        id={`live_drop_${value?.metaData?.preview}_${random}`}
      />

      {/* <div className="timmer">
          <Timer key={`live_drop_time_${index}`} token={value} />
        </div> */}
    </div>
    // </Link>
  );
}
