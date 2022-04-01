import Link from "next/link";
import React from "react";

export default function GatewayArea() {
  return (
    <>
      <div className="bg-dark font-gordita pt-5 pb-5">
        <div className="container gateway-area">
          <div className="row">
            <div className="col-12 text-center col-center">
              <h2 className="title-gradient title-h2 mb-4">
                PolyOne is a Global One Initiative.
              </h2>
              <div className="content-col mt-3 col-center ">
                <p>
                  In partnership with Giving Block, PolyOne is affiliated with
                  hundreds of reputable charities and NGO’s doing remarkable
                  work worldwide. Stand with PolyOne and Giving Block. PolyOne
                  gives back in three ways:
                  <ul className="mt-3">
                    <li className="m-2">
                      We curate regular PolyOne NFT series, such as our Ticket
                      Launch & XOplanet series to benefit great causes
                    </li>
                    <li className="m-2">
                      Creators have the option from a simple drop down menu to
                      donate a percentage of sales of their own NFTs to benefit
                      the charity of their choice
                    </li>
                    <li className="m-2">
                      ONE-Hundred percent of all PolyOne platform net proceeds
                      will go to Global One. Global One will be a fully
                      transparent defi lending platform that provides financing
                      to private-sector firms across a spectrum of business
                      sectors with ESG (Environmental, Sustainability &
                      Governance) projects that either elevate the standard of
                      living in our communities or address matters of Global
                      concern.{" "}
                    </li>
                  </ul>
                </p>
                <p>
                  PolyOne is a Global One initiative. One Hundred percent of
                  Global One net-proceeds will also circulate back into the
                  organization to grow and continue its mission to improve our
                  world.
                </p>
                <p>
                  Global One and PolyOne harness the blockchain creator economy
                  to elevate our collective consciousness and to achieve real
                  and lasting systemic change as we launch into this new era of
                  human societal development.
                </p>

                <h4>
                  <b>Giving Block our Charity Partner</b>
                </h4>

                <div className="image-col">
                  <p>
                    Be the change you wish to see. Join us on PolyOne.
                    <br />
                    Together with Giving Block “Let’s make crypto the greatest
                    force for good on the planet!”
                  </p>
                  <img src="/images/home-one/gateway.png"></img>
                </div>
              </div>

              {/* <div className="trending-btn text-end mt-5">
                 <Link href="#">
                  <a className="default-btn border-radius-5">Learn More</a>
                </Link> 
              </div>*/}
            </div>
            {/* <div className="col-lg-6 text-center">
              <div className="images">
                <div className="left-col">
                  <img
                    className="image-round-small"
                    src="/images/featured/featured-img1.jpg"
                  ></img>
                  <img
                    className="image-round-small margin-left"
                    src="/images/featured/featured-img1.jpg"
                  ></img>
                </div>
                <div className="right-col">
                  <img
                    className="image-round-big"
                    src="/images/home-one/gateway.png"
                  ></img>
                  <img
                    className="image-round-big margin-left"
                    src="/images/featured/featured-img1.jpg"
                  ></img>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}
