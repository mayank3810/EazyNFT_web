import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import API from "../../services/API";
import DashboardNFTCard from "../NFTCard/DashboardNFTCard";
import Loading from "../Loading/Loading";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  loop: true,
  margin: 0,
  lazyLoad: true,
  lazyContent: true,
  video: true,
  nav: true,
  mouseDrag: false,
  dots: false,
  autoplay: true,
  smartSpeed: 500,
  navText: [
    "<div class='nav-btn-left'><i class='ri-arrow-left-s-line'></i></div>",
    "<div class='nav-btn-right'><i class='ri-arrow-right-s-line'></i></div>",
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

const TrendingArea = ({ bg, userinfo }) => {
  const [display, setDisplay] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState([]);

  useEffect(() => {
    let random = Math.random();
    if (random > 0.5) random = 1;
    else random = -1;
    let random2 = Math.random();
    if (random2 > 0.5) random2 = 1;
    else random2 = -1;
    let data = {
      page: 0,
      sort: {
        "metaData.preview": 1 * random * random2,
        name: random,
        createdAt: 1,
      },
      filter: {},
      perPage: 22,
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

  return (
    <>
      <div className={`trending-area ${bg} pb-4`}>
        <div className="container">
          <div className="row">
            <div className="col-12 heading-area">
              <h1 className="text-center section-heading m-5 font-druk">
                Erbil Launch collection
              </h1>
              <p className="text-center">
                Collectors & Creators - join our roster of international artists
                who have chosen to stand on PolyOne’s platform for peace to
                raise our voices with music, dance and art. All creations seen
                on PolyOne’s historic launch event at the ancient Citadel of
                Erbil, plus a remarkable selection of original art by the same &
                other creators will be available for purchase upon launch
                starting 3.21.22. First access to PolyOne ticket holders.
              </p>
            </div>
            <div className="col-lg-8 col-md-6 mt-5">
              <div className="section-title">
                <h2>Featured Artworks from Erbil</h2>
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
                  <DashboardNFTCard
                    key={`live-drop-${index}=${Math.random()}`}
                    token={value}
                  />
                ))}
              </OwlCarousel>
            )}
          </div>
          <div className="trending-btn text-end mt-5">
            <Link href="/collection/Erbil%20Collection">
              <a className="default-btn border-radius-5 mr-2">
                See More <i class="ri-arrow-right-line icon"></i>
              </a>
            </Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(TrendingArea);
