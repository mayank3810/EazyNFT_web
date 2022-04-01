import React, { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import MintPlanetBanner from "../components/HomeOne/MintPlanetBanner";
import TrendingArea from "../components/HomeOne/TrendingArea";
import TopSeller from "../components/Common/TopSeller";
import AuctionArea from "../components/HomeOne/AuctionArea";
import CreateArea from "../components/HomeOne/CreateArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import API from "../services/API";
import BrandArea from "../components/brand-area";
import UpcomingDrops from "../components/upcoming-drops";
import NewsLetter from "../components/newsletter";
import MediumArea from "../components/genre-area";
import LaunchPartners from "../components/launch-partners";
import HomeBanner from "../components/home-banner2";
import GatewayArea from "../components/gateway-area";
import ContinueArea from "../components/continue-area";
import LiveDrops from "../components/live-drops";
import Header from "../components/Header/header";
import BannerArea from "../components/HomeOne/BannerArea";
import LatestNews from "../components/latest-news";
import HotCollections from "../components/hot-collections";
import GenesisDrop from "../components/genesis-drop";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [sellNFT, setSellNFT] = useState();
  const [banner, setBanner] = useState();

  const [topAuthors, setTopAuthors] = useState();

  const [nfts, setNfts] = useState();

  const [nftOne, setnftOne] = useState();
  const [nftTwo, setnftTwo] = useState();

  useEffect(async () => {
    if (typeof window !== "undefined") {
      if (!loading) {
        if (
          localStorage.getItem("bannerData") === "" ||
          localStorage.getItem("bannerData") === null
        ) {
          const bData = await fetch(
            process.env.NEXT_PUBLIC_CMS_API_URL + "/homeheader/"
          );
          const jsonBanner = await bData.json();
          setBanner(jsonBanner?.items[0]?.data);
          if (jsonBanner && jsonBanner.items) {
            localStorage.setItem(
              "bannerData",
              JSON.stringify(jsonBanner.items[0].data)
            );
            console.log("Started timer");
            window.setTimeout(() => {
              console.log("Banner timer removed");
              localStorage.removeItem("bannerData");
            }, 5 * 60 * 1000);
          }
        } else {
          setBanner(JSON.parse(localStorage.getItem("bannerData")));
        }

        let data = {
          page: 0,
          perPage: 2,
          sort: { createdAt: -1 },
          filter: {},
        };
        const nftsData = await API.getHeaderNFT(data);
        const jsonNfts = await nftsData?.data?.result;

        if (jsonNfts) {
          let squidexData = JSON.parse(localStorage.getItem("bannerData"));
          if (
            squidexData?.nft.iv[0]?.nftId != null &&
            squidexData?.nft.iv[0]?.nftId !== ""
          ) {
            const result = await fetch(
              process.env.NEXT_PUBLIC_API_URL +
                "/collectible/" +
                squidexData?.nft.iv[0]?.nftId
            );
            const json = await result.json();

            setnftOne({ flag: "squidex", data: json.data });
          } else {
            setnftOne({ flag: "api", data: jsonNfts[0] });
          }
          if (
            squidexData?.nft.iv[1]?.nftId != null &&
            squidexData?.nft.iv[1]?.nftId !== ""
          ) {
            const result = await fetch(
              process.env.NEXT_PUBLIC_API_URL +
                "/collectible/" +
                squidexData?.nft.iv[1]?.nftId
            );
            const json = await result.json();
            setnftTwo({ flag: "squidex", data: json.data });
          } else {
            setnftTwo({ flag: "api", data: jsonNfts[1] });
          }
        }

        // const topAuthorsData = await fetch(
        //   process.env.NEXT_PUBLIC_API_URL + "/user/topAuthors"
        // );
        // const jsonTopAuthors = await topAuthorsData.json();
        // setTopAuthors(jsonTopAuthors?.data);

        const sellNFTData = await fetch(
          process.env.NEXT_PUBLIC_CMS_API_URL + "/homesellnft/"
        );
        const jsonNft = await sellNFTData.json();
        setSellNFT(jsonNft?.items[0]?.data);

        setLoading(true);
      }
    }
  }, []);

  async function getHeaderNFTs() {}
  return (
    <>
      <Navbar />
      {/* <BannerArea bannerContent={banner} nftOne={nftOne} nftTwo={nftTwo} /> */}
      {/* <Header /> */}
      <BannerArea bannerContent={banner} nftOne={nftOne} nftTwo={nftTwo} />
      <GenesisDrop />

      {/* <HomeBanner /> */}
      <MintPlanetBanner />
      <LiveDrops />
      <TrendingArea bg="bg-dark" />

      <NewsLetter />
      {/* <MediumArea /> */}

      <LaunchPartners />
      <HotCollections />

      {/* <LatestNews /> */}

      {/* <TopSeller topSellers={topAuthors} /> */}
      {/* <AuctionArea /> */}
      {/* <UpcomingDrops /> */}
      <GatewayArea />

      <ContinueArea />

      {/* <BrandArea /> */}
      {/* <CreateArea cmsContent={sellNFT} /> */}
      {/* <Footer /> */}
      <Copyright />
    </>
  );
}
