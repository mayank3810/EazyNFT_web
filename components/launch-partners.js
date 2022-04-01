import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function LaunchPartners() {
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
      "<div class='prev-btn prev-partner-nav'><i class='ri-arrow-left-s-line'></i></div>",
      "<div class='next-btn prev-partner-nav'><i class='ri-arrow-right-s-line'></i></div>",
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
    //

    // </OwlCarousel>
    <>
      <div className="bg-darker pb-5 pt-5 partner-area">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="text-center section-heading m-5 pb-3 font-druk">
                Strategic partners
              </h1>
            </div>
            <OwlCarousel {...options}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="launch-partner">
                    <h1 className="section-subtitle">Partners in Curation</h1>
                    <img
                      className="hide-mobile line-img"
                      src="/images/landing-page/curved-line.svg"
                    />
                    <div className="details mt-5">
                      <p>
                        <b>PolyOne</b> is a unique project built on the premise
                        that we are stronger together. We’ve proudly partnered
                        with artistic powerhouses Trendland.com, Braw Haus and
                        Parlor Gallery to curate the finest digital art for our
                        platform and to begin to build community.
                      </p>
                      <p className="mt-3">
                        We will continue to build alliances with galleries, film
                        studios, Broadway producers, dance companies, musicians,
                        fashion houses, architectural firms, gaming companies
                        etc. to continually bring you the best of art, design
                        and entertainment.{" "}
                      </p>
                      <div className="partner-logo mt-5">
                        <img
                          className="img-fluid"
                          style={{
                            height: "86px",
                            width: "86px",
                            marginTop: "5px",
                          }}
                          src="/images/home-one/partner-logo-1.png"
                        ></img>
                        <img
                          className="img-fluid"
                          style={{ height: "100px", width: "100px" }}
                          src="/images/home-one/partner-logo-2.png"
                        ></img>

                        <img
                          style={{
                            height: "41px",
                            width: "160px",
                            marginTop: "28px",
                          }}
                          className=""
                          src="https://www.parlor-gallery.com/site2014/wp-content/uploads/2018/01/logo-315.png"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-items-center col-lg-6 d-flex justify-content-center">
                  <img
                    className="partner-img img-fluid"
                    src="/images/home-one/partner-sc-2.png"
                    alt="partner-image"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="launch-partner">
                    <h1 className="section-subtitle">Parlor-gallery.com</h1>
                    <img
                      className="hide-mobile line-img"
                      src="/images/landing-page/curved-line.svg"
                    />
                    <div className="details mt-5">
                      <p>
                        <b></b>
                      </p>
                      <p className="mt-3">
                        Parlor Gallery opened in 2009 in Asbury Park, NJ and is
                        located about an hour from both NYC and Philadelphia. We
                        present a unique vision in New Jersey’s art community
                        and feature innovative work by some of the best emerging
                        and established artists. We curate exhibits the public
                        may not ordinarily have access to outside of a large
                        urban environment within a welcoming, creative, and
                        inspirational space. The Gallery provides a venue for
                        both talented young artists who’ve never exhibited as
                        well as internationally collected and established
                        artists. In the last few years, Parlor has begun to
                        curate other venues, pop-up exhibits and participate in
                        art fairs such as SCOPE Miami and NYC.
                      </p>
                      <div className="partner-logo mt-5">
                        <img
                          style={{
                            height: "41px",
                            width: "160px",
                            marginTop: "28px",
                          }}
                          className=""
                          src="https://www.parlor-gallery.com/site2014/wp-content/uploads/2018/01/logo-315.png"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-items-center col-lg-6 d-flex justify-content-center">
                  <img
                    className="partner-img img-fluid"
                    src="/images/home-one/partner-sc-2.png"
                    alt="partner-image"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="launch-partner">
                    <h1 className="section-subtitle">Trendland.com</h1>
                    <img
                      className="hide-mobile line-img"
                      src="/images/landing-page/curved-line.svg"
                    />
                    <div className="details mt-5">
                      <p>
                        <b></b>
                      </p>
                      <p className="mt-3">
                        Online Magazine, Trendland.com, redefines new ways of
                        telling stories through a rich visual journey.
                        <br />
                      </p>
                      <p>
                        Trendland aims to be the source for trend forecasters
                        and creative professionals while redefining web media
                        and becoming a techno-savvy hybrid of a magazine, art
                        gallery and multi-media all in one. Relying solely on
                        organic marketing, Trendland has carved out their niche
                        as a respected influence in the fashion, Design and Art
                        landscape.
                      </p>
                      <div className="partner-logo mt-5">
                        <img
                          className="img-fluid"
                          style={{ height: "100px", width: "100px" }}
                          src="/images/home-one/partner-logo-2.png"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-items-center col-lg-6 d-flex justify-content-center">
                  <img
                    className="partner-img img-fluid"
                    src="/images/home-one/partner-sc-2.png"
                    alt="partner-image"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="launch-partner">
                    <h1 className="section-subtitle">Brawhaus.com</h1>
                    <img
                      className="hide-mobile line-img"
                      src="/images/landing-page/curved-line.svg"
                    />
                    <div className="details mt-5">
                      <p>
                        <b></b>
                      </p>
                      <p className="mt-3">
                        Braw Haus is a visual power house, Founded by Patricia
                        Gloum and Justine Vilgrain in 2018. Braw Haus is
                        specialised in elevating powerful digital artist from
                        around the world, to bring their aesthetic and vision to
                        shape culture in the metaverse. **Braw Haus represents
                        NFT artists and partners with them to produce
                        large-scale installations, experiential events and
                        curated exhibitions in major cities. As well as creating
                        powerful experimental commercials for various brand.
                        Between Paris, New York and Athens Braw Haus has grown
                        within the Web3 community.
                      </p>
                      <div className="partner-logo mt-5">
                        <img
                          className="img-fluid"
                          style={{
                            height: "86px",
                            width: "86px",
                            marginTop: "5px",
                          }}
                          src="/images/home-one/partner-logo-1.png"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-items-center col-lg-6 d-flex justify-content-center">
                  <img
                    className="partner-img img-fluid"
                    src="/images/home-one/partner-sc-2.png"
                    alt="partner-image"
                  />
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}
