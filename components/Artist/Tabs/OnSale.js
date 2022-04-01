import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import { connect } from "react-redux";

import API from "../../../services/API";
import { toast } from "react-toastify";
import NFTCard2 from "../../NFTCard/NFTCard2";
import { useWindowSize } from "../../../services/hooks";
import DashboardNFTCard from "../../NFTCard/DashboardNFTCard";

const filters = (walletAddress, type) => {
  let obj = {
    "On sale": {
      currentOwnerList: walletAddress,
      isMintOnSale: true,
    },
    Owned: {
      currentOwnerList: walletAddress,
      createdBy: { $ne: walletAddress },
    },
    Created: { createdBy: walletAddress },
  };
  return obj[type];
};

const OnSale = (props) => {
  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(0);
  const [grid, setgrid] = useState(4);

  const ref = useRef();
  const size = useWindowSize();

  useEffect(() => {
    const _width = ref?.current?.offsetWidth || size?.width;
    const _grid = Math.floor(_width / 272);
    setgrid(_grid);
  }, [size?.width]);

  useEffect(() => {
    debounceCollectiables({
      page,
      artist: props?.artist,
      type: props?.type,
      list,
    });
  }, [page]);

  useEffect(() => {
    setlist([]);
    setpage(0);
    debounceCollectiables({
      page: 0,
      artist: props?.artist,
      type: props?.type,
      list: [],
    });
  }, [props?.type, props?.artist]);

  const debounceCollectiables = useCallback(
    debounce((q) => getAllCollectiables(q), 100),
    []
  );

  const getAllCollectiables = ({ page, artist, type, list }) => {
    let data = {
      page,
      limit: 12,
      filter: filters(artist, type),
      isProfile: true,
    };
    setisLoading(true);
    API.getAllCollectiables(data)
      .then((response) => {
        setlist([...list, ...response?.data?.result]);
        if (response?.data?.result?.length < 12) sethasMore(false);
        else sethasMore(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  const handlePage = () => {
    if (isLoading) return;
    setpage(page + 1);
  };

  return (
    <>
      <div className="discover-area pt-50">
        {/* <DiscoverTopbar
                countDetails={countDetails}
                handleChange={handleFilters}
                filterData={filterData}
              /> */}

        <div ref={ref}>
          <InfiniteScroll
            dataLength={Math.floor(list.length / grid)}
            next={handlePage}
            hasMore={hasMore}
          >
            <div
              className="grid-wrapper"
              style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}
            >
              {list.map((value, index) => (
                <DashboardNFTCard key={index} token={value} />
              ))}
              {isLoading &&
                [1, 2, 3, 4].map((value, index) => (
                  <div
                    key={`live_drop_${index}`}
                    role="button"
                    className="nft-card-new2"
                  />
                ))}
            </div>
          </InfiniteScroll>

          {!isLoading && !list.length && (
            <div className="tabs_item">
              <div className="row">
                <div className="col-12">
                  <div className="error-area ptb-100">
                    <div className="d-table">
                      <div className="d-table-cell">
                        <div className="error-content">
                          <h3>No NFT Found</h3>
                          {/* <p>Try different filters. Start selling today!</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(OnSale);
