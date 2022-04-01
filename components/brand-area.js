import React from "react";

export default function BrandArea() {
  return (
    <>
      <div className="line"></div>

      <div className="bg-black font-gordita pb-5 pt-5">
        <div className="brand-container">
          <div className="row justify-content-center">
            {/* <div className="col-12 mb-5">
            <h2 className="subtitle">We're a Global One Fund initiative. </h2>
          </div> */}

            <div className="col-12 text-center mb-5 continue-area ">
              <h2>Our Partners</h2>
            </div>
            <div className="col-2 brand-img">
              <img src="images/brand/image1.png"></img>
            </div>

            <div className="col-2 brand-img">
              <img src="images/brand/image2.png"></img>
            </div>

            <div className="col-2 brand-img">
              <img src="images/brand/image3.png"></img>
            </div>

            <div className="col-2 brand-img ">
              <img src="images/brand/image4.png"></img>
            </div>

            <div className="col-2 brand-img">
              <img src="images/brand/image5.png"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
