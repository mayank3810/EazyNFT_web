import React from "react";

export default function FooterNew() {
  return (
    <div className="bg-dark font-gordita padding">
      <div className="container footer-new">
        <div className="row">
          <div className="col-lg-4 mr-20">
            <h4 className="mb-4">Eazy NFT</h4>
            <p className="mb-5">
              Eazy NFT is an emerging NFT enabler. We believe in decentralized Web / Web3 and our aim is to make is easier for everyone to switch to a NFT infrastructure.
            </p>
            <p>Copyright 2022. </p>
          </div>
          <div className="col-lg-2">
            <div className="link-container">
              <a href="#">Drops</a>

              <a href="#">Marketplace</a>

              <a href="#">Discover</a>

              <a href="#">Connect</a>

              <a href="#">Stats</a>

              <a href="#">Action</a>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="link-container">
              <a href="#">About</a>

              <a href="#">Careers</a>

              <a href="#">Contact Us</a>

              <a href="#">Privacy</a>

              <a href="#">Terms</a>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="social-container">
              <h4 className="mb-4">Follow us</h4>
              <div className="icons">
                <i class="ri-facebook-fill"></i>
                <i class="ri-linkedin-fill"></i>
                <i class="ri-twitter-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
