import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "../../services/API";
import { toast } from "react-toastify";
import Timer from "../Timer/Timer";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import DashboardNFTCard from "../NFTCard/DashboardNFTCard";
import Loading from "../Loading/Loading";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  loop: true,
  margin: 0,
  nav: true,
  mouseDrag: false,
  dots: false,
  autoplay: true,
  smartSpeed: 500,
  navText: [
    "<i class='ri-arrow-left-s-line'></i>",
    "<i class='ri-arrow-right-s-line'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

const AuctionArea = ({ bg, userinfo }) => {
  const [display, setDisplay] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState([]);

  useEffect(() => {
    let data = {
      page: 0,
      sort: { createdAt: -1 },
      filter: {
        isMintOnSale: true,
        nftType: "timed-auction",
      },
    };
    setisLoading(true);
    API.getAllCollectiables(data)
      .then((response) => {
        setlist(response?.data?.result);
        setDisplay(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  }, []);

  if (list.length < 5) return null;
  return (
    <>
      <div className={`trending-area ${bg} pt-25 pb-70`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6">
              <div className="section-title">
                <h2>Live Auctions</h2>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="trending-btn text-end">
                <Link href="/certificates?market=auction">
                  <a className="default-btn border-radius-5">Explore More</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="trending-slider pt-45">
            {!display ? (
              <div className="mt-5 mb-t">
                <Loading />
              </div>
            ) : (
              <OwlCarousel {...options}>
                {list.map((value, index) => (
                  <DashboardNFTCard token={value} />
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AuctionArea);
