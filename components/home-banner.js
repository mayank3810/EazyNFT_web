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
          <div className="col-7">
            <div style={{ paddingRight: "80px", paddingTop: "80px" }}>
              <h1>Launch Your Own NFT Store in Minutes. </h1>
              <p className="mt-4 mb-4">
                NFC Product Authenticatior empowers you to create your own nft marketplace without any technical knowledge.
                Enable NFTs in your Video, Tweets, Audio, Images, PDF documents and make your content exclusive to your community.
              </p>
              <Link href={`/certificates`}>
                <a className="btn btn-warning">Explore NFTs</a>
              </Link>
            </div>
          </div>

          <div className="col-5">
            <OwlCarousel {...options}>
              <div
                style={{
                  backgroundImage: 'url(images/home-one/about-company.jpeg)',
                }}
                className="banner-card"
              ></div>

              <div
                style={{
                  backgroundImage: 'url(images/home-one/home-one-img1.jpg)',
                }}
                className="banner-card"
              ></div>

              <div
                style={{
                  backgroundImage: 'url(images/home-one/home-one-img2.jpg)',
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
