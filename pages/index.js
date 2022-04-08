import React from "react";
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

export default function HomeNew() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <LiveDrops />
      <UpcomingDrops />
      <NewsLetter />
      <GenreArea />
      <GatewayArea />
      <BrandArea />
      <FooterNew />
    </>
  );
}
