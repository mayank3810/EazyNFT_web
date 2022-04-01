import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";

const BannerArea = ({ bannerContent, nftOne, nftTwo, userinfo }) => {
  const OwlCarousel = dynamic(import("react-owl-carousel3"));

  const options = {
    loop: true,
    margin: 0,
    nav: true,
    mouseDrag: true,
    dots: false,
    autoplay: true,
    smartSpeed: 500,
    navText: [
      "<div class='banner-btn-left'><i class='ri-arrow-left-s-line'></i></div>",
      "<div class='banner-btn-right'><i class='ri-arrow-right-s-line'></i></div>",
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
    <>
      <div className="banner-area font-druk">
        <div className="container">
          {/* <OwlCarousel {...options}> */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <section className="header-content ">
                {/**Munny Changes */}
                <div className="header-wrapper">
                  <h1 className="header-title mt-5">
                    PolyOne<sub>Marketplace</sub>
                  </h1>
                  <h3 className="header-subtitle">Launch</h3>
                  <h4>
                    An arts and entertainment NFT portal
                    <br /> Discover a new universe with PolyOne exclusive
                    Genesis drop with animated NFT tickets of our Earth, Sun and
                    Moon
                  </h4>
                </div>
                <div className="btn-container d-flex">
                  {!userinfo?.user?.walletAddress && (
                    <div className="btn-area">
                      <button className="button btn-grad ml-5">
                        Connect Wallet{" "}
                        <i className="ri-arrow-right-line icon" />
                      </button>
                    </div>
                  )}
                  <div className="btn-area">
                    <a
                      className="button btn-white m-1 mt-0 mb-0"
                      href="#mint-section"
                    >
                      Reserve an XOplanet
                    </a>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-lg-6 text-center mt-5">
              <img
                style={{ float: "right" }}
                src="/images/home-one/banner-planets.svg"
              />
              {/* <div className="card-container d-flex">
                <div
                  className="card-1"
                  style={{
                    backgroundImage:
                      'url("/images/landing-page/background.png")',
                  }}
                >
                  <div className="card-header m-3 d-flex justify-content-between">
                    <img src="/images/favicon.png" alt="Image" />
                  </div>
                  <a className="connect-btn-2">Planet earth #007</a>
                </div>
                <div
                  className="card-2"
                  style={{
                    backgroundImage:
                      'url("/images/landing-page/Rectangle.png")',
                  }}
                >
                  <div className="card-header m-3 d-flex justify-content-between">
                    <img src="/images/favicon.png" alt="Image" />
                  </div>
                  <a className="connect-btn-2">Planet moon #003</a>
                </div>

                <div
                  className="card-3"
                  style={{
                    backgroundImage:
                      'url("/images/landing-page/Rectangle.png")',
                  }}
                >
                  <div className="card-header m-3 d-flex justify-content-between">
                    <img src="/images/favicon.png" alt="Image" />
                  </div>
                  <a className="connect-btn-2">Planet moon #003</a>
                </div>
              </div> */}
            </div>
          </div>

          {/* </OwlCarousel> */}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BannerArea);
