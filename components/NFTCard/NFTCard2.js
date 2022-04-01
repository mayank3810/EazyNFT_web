import Link from "next/link";
import React from "react";

import Asset from "../Image/Asset";

export default function NFTCard2({ value, index }) {
  return (
    <Link key={`live_drop_${index}`} href={`/asset/${value?.tokenId}`}>
      <div
        key={`live_drop_${index}`}
        id={`live_drop_${index}`}
        role="button"
        className="nft-card-new2"
        style={{ overflow: "hidden" }}
      >
        <Asset
          type={value?.metaData?.type || "image"}
          imageSrc={value?.metaData?.preview}
          thumbnail={value?.metaData?.preview}
          videoSrc={[value?.metaData?.preview]}
          objectFit="cover"
        />
      </div>
    </Link>
  );
}
