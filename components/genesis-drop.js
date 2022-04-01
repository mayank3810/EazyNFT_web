import React from "react";

export default function GenesisDrop() {
  return (
    <div className="genesis-drop">
      <div className="container">
        <div className="row">
          <div className="col-12 heading-area">
            <h1 className="text-center section-heading m-5 mb-3 font-druk">
              polyone Genesis Drop
            </h1>
            <h3 className="text-center mb-3">XOplanets</h3>
          </div>
          <div className="col-lg-6">
            <div className="planet-card genesis-drop-pcard">
              <div className="planet-card-conatiner card-big">
                <img
                  loading="lazy"
                  src="/images/home-one/genesis-nft.png"
                  className="asset-img-wrapper"
                  style={{ objectFit: "cover" }}
                />
                {/* <div className="planet-card-header">
                  <img
                    src="/images/favicon.png"
                    className="planet-author-img"
                  />
                </div> */}
                <div className="planet-card-footer cursor-pointer">
                  <span>
                    Planet <span className="text-capitalize">earth</span>{" "}
                    {/* */}0.3 ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="info">
                  <h4>Holder Benefits</h4>
                  <p>
                    Genesis drop NFT holders will receive a range of benefits on
                    PolyOne including Whitelisting for future drops, privileged
                    access to our XOplanet series, members-only drops, reserved
                    supply, unlockable content, free airdrops and more
                    <br /> Purchase all three to receive a fourth bonus NFT
                    airdropped into your wallet.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info">
                  <h4>Be a part of the PolyOne Community</h4>
                  <p>
                    Blast-off to where no one has gone before. Raise your voices
                    in peace with music and art, and join us to elevate to a
                    Class One Civilization! A Global One!
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              {/* <div className="col-6">
                <div className="info">
                  <h4>Sell & Secondary Market</h4>
                  <p>
                    Upload your work (image, video, audio, or 3D art), add a
                    title and description, and customize your NFTs
                  </p>
                </div>
              </div> */}
              {/* <div className="col-6">
                <div className="info">
                  <h4>White Listing</h4>
                  <p>
                    Click Create and Add social links, a description, profile &
                    banner images, and set a secondary sales fee.
                  </p>
                </div>
              </div> */}

              <div className="col-12 text-end mt-5">
                {/* <a className="default-btn border-radius-5 mr-2" href="/#">
                  FAQ <i class="ri-arrow-right-line icon"></i>
                </a> */}
              </div>
            </div>
          </div>
          <div
            className="col-12 text-center"
            style={{ position: "relative", color: "#fff", top: "185px" }}
          >
            Live drops accessible to PolyOne ticket holders. Help refugees of
            war in Ukraine & Iraq. <br />
            Buy your ticket Now! Only 3.333 tickets total. Once tickets are sold
            out, live drops are available to the world.
          </div>
        </div>
      </div>
    </div>
  );
}
