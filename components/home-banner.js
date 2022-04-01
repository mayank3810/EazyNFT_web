import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";

export default function HomeBanner() {
  const OwlCarousel = dynamic(import("react-owl-carousel3"));

  const options = {
    loop: true,
    margin: 0,
    nav: false,
    mouseDrag: true,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <div className="bg-darker">
      <div className="container bg-dark-one font-gordita ">
        <div className="row padding">
          <div className="col-5 nft-detail mr-20">
            <h1>The Recursion assemblage</h1>
            <p>
              The Recursion is a series of works using geometric recursion to
              create flowing architectural forms inspired...
            </p>

            <div className="author-area mt-4 mb-4">
              <img src="/images/author/author-user2.jpg"></img>
              <div className="d-flex flex-column author-name">
                <span>Created by</span>
                <h6>Brendan Dawes</h6>
              </div>

              <button type="button" class="btn">
                Follow Me
              </button>
            </div>

            <div className="nft-stats mt-4 mb-4">
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
            </div>
            <button className="btn btn-yellow">View Drop Detail</button>
          </div>

          <div className="col-6 m-auto">
            <OwlCarousel {...options}>
              <div
                style={{
                  backgroundImage: 'url(images/home-one/about-company.jpeg)',
                }}
                className="banner-card"
              ></div>

              <div
                style={{
                  backgroundImage: 'url(images/home-one/about-company.jpeg)',
                }}
                className="banner-card"
              ></div>

              <div
                style={{
                  backgroundImage: 'url(images/home-one/about-company.jpeg)',
                }}
                className="banner-card"
              ></div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}
