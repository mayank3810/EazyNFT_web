import React, { useEffect, useState } from "react";
// import About from "../components/about";
import BrandArea from "../components/brand-area";
import FooterNew from "../components/footer-new";
import GatewayArea from "../components/gateway-area";
import GenreArea from "../components/genre-area";
import HomeBanner from "../components/home-banner";
import LiveDrops from "../components/live-drops";
import NewsLetter from "../components/newsletter";
import UpcomingDrops from "../components/upcoming-drops";
import Navbar from "../components/Layout/Navbar";
import TrendingArea from "../components/HomeOne/TrendingArea";
import TopSeller from "../components/Common/TopSeller";

export default function HomeNew() {

  const [topAuthors, setTopAuthors] = useState();

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const topAuthorsData = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user/topAuthors"
      );
      const jsonTopAuthors = await topAuthorsData.json();
      setTopAuthors(jsonTopAuthors?.data);

    }
  }, []);


  return (
    <>
      <Navbar />
      <HomeBanner />
      <TrendingArea />
      <TopSeller topSellers={topAuthors} />
      <LiveDrops />
      {/* <UpcomingDrops /> */}
      <NewsLetter />
      <GenreArea />
      <GatewayArea />
      {/* <BrandArea /> */}
      <FooterNew />
    </>
  );
}
