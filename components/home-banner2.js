import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";

export default function HomeBanner() {
  const OwlCarousel = dynamic(import("react-owl-carousel3"));

  const options = {
    loop: true,
    margin: 0,
    nav: true,
    mouseDrag: false,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    navText: [
      "<div class='prev-btn'><i class='ri-arrow-left-s-line'></i></div>",
      "<div class='next-btn'><i class='ri-arrow-right-s-line'></i></div>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      1000: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  };

  return (
    <OwlCarousel {...options}>
      <div
        className="bg-darker new-home-top-banner-container"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.3)), url(images/home-one/home-top-banner.jpeg)`,
        }}
      >
        <div className="nft-detail h-100" style={{ position: "relative" }}>
          <div style={{ maxWidth: "500px" }}>
            <h1>The Recursion assemblage</h1>

            <div className="mt-5">
              <button className="btn btn-yellow">View Drop Detail</button>
            </div>
          </div>

          <div
            className="author-area"
            style={{ position: "absolute", bottom: 0 }}
          >
            <img src="/images/author/author-user2.jpg"></img>
            <div className="d-flex flex-column author-name">
              <span>Created by</span>
              <h6>Brendan Dawes</h6>
            </div>

            <button type="button" class="btn">
              Follow Me
            </button>
          </div>

          {/* <div className="nft-stats mt-4 mb-4">
              <div>
                <span>Active Arts</span>
                <h6>3 of 7 Arts Sold</h6>
              </div>
              <div className="border-left">
                <span>Expired in</span>
                <h6>2 Days 20 Hours</h6>
              </div>
              <div className="border-left">
                <span>Total View</span>
                <h6>3K+</h6>
              </div>
            </div> */}
        </div>
      </div>
      <div
        className="bg-darker new-home-top-banner-container"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.3)), url(images/home-one/about-company.jpeg)`,
        }}
      >
        <div className="nft-detail h-100" style={{ position: "relative" }}>
          <div style={{ maxWidth: "500px" }}>
            <h1>The Recursion assemblage</h1>

            <div className="mt-5">
              <button className="btn btn-yellow">View Drop Detail</button>
            </div>
          </div>

          <div
            className="author-area"
            style={{ position: "absolute", bottom: 0 }}
          >
            <img src="/images/author/author-user2.jpg"></img>
            <div className="d-flex flex-column author-name">
              <span>Created by</span>
              <h6>Brendan Dawes</h6>
            </div>

            <button type="button" class="btn">
              Follow Me
            </button>
          </div>

          {/* <div className="nft-stats mt-4 mb-4">
              <div>
                <span>Active Arts</span>
                <h6>3 of 7 Arts Sold</h6>
              </div>
              <div className="border-left">
                <span>Expired in</span>
                <h6>2 Days 20 Hours</h6>
              </div>
              <div className="border-left">
                <span>Total View</span>
                <h6>3K+</h6>
              </div>
            </div> */}
        </div>
      </div>
    </OwlCarousel>
  );
}
