import React from "react";

export default function PlanetNftCard() {
  return (
    <div
      style={{ backgroundImage: 'url("/images/home-v1/nft-1.png")' }}
      className="planet-card-conatiner"
    >
      <div className="planet-card-header">
        <img
          src="/images/author/author-img1.jpg"
          className="planet-author-img"
        ></img>
      </div>
      <div className="planet-card-footer">
        <span>Planet Earth #000</span>
      </div>
    </div>
  );
}
