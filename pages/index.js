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
import WalletButton from "../components/CollectWallet/WalletButton";
import { connect, useDispatch } from "react-redux";
import { setRedirect, openConnectModal } from "../redux/actions/main";
import { wrapper } from "../redux/store";

function HomeNew(ctx) {
  const currentUser = ctx?.user?.user;
  const isAdmin = (currentUser.roles || []).includes("admin");
  // const [topAuthors, setTopAuthors] = useState();

  // useEffect(async () => {
  //   if (typeof window !== "undefined") {
  //     const topAuthorsData = await fetch(
  //       process.env.NEXT_PUBLIC_API_URL + "/user/topAuthors"
  //     );
  //     const jsonTopAuthors = await topAuthorsData.json();
  //     setTopAuthors(jsonTopAuthors?.data);

  //   }
  // }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="connect-btn-center">
        <WalletButton showMore={true} isAdmin={isAdmin} />
      </div>
      {/* <HomeBanner /> */}
      {/* <TrendingArea /> */}
      {/* <TopSeller topSellers={topAuthors} /> */}
      {/* <LiveDrops /> */}
      {/* <UpcomingDrops /> */}
      {/* <NewsLetter /> */}
      {/* <GenreArea /> */}
      {/* <GatewayArea /> */}
      {/* <BrandArea /> */}
      {/* <FooterNew /> */}
    </>
  );
}

export const getInitialPageProps = wrapper.getInitialPageProps(
  ({ store, req, res }) => {
    const state = store.getState();
  }
);

const mapStateToProps = (state) => {
  return { main: state.main, user: state.user };
};

const mapDispatchToProps = {
  setRedirect,
  openConnectModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeNew);
