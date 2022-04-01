import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import { connect } from "react-redux";

import API from "../../../services/API";
import { toast } from "react-toastify";
import NFTCard from "../../NFTCard/NFTCard";
import Pagination from "../../Common/Pagination";
import NFTSkeleton from "../../NFTCard/NFTCard";
import { useWindowSize } from "../../../services/hooks";
import Link from "next/link";
// import CollectionCard from "../../CollectionCard/CollectionCard";

const Collections = (props) => {
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
    debounceCollectiables({ page });
  }, [page]);

  useEffect(() => {
    setpage(0);
    setlist([]);
    debounceCollectiables({
      page: 0,
      artist: props?.artist,
      type: props?.type,
      list
    });
  }, [props?.type, props?.artist]);

  const debounceCollectiables = useCallback(
    debounce((q) => getAllCollectiables(q), 500),
    []
  );

  const getAllCollectiables = ({ page, artist, list }) => {
    let data = {
      page,
      limit: 12,
      filter: { owner: artist },
    };
    setisLoading(true);
    API.getCollections(data)
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
    <div className="discover-area pt-50">
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
              <div key={index} className="mb-5 d-flex justify-content-center">
                <div className="hot-collection-card">
                  <Link href={`/collection/${value.name}`}>
                    <div className="hot-collection-image" role="button">
                      <img src={value?.banner}></img>
                    </div>
                  </Link>
                  <Link href={`/collection/${value.name}`}>
                    <div className="hot-collection-header">
                      <button className="btn btn-opacity-two truncate m-auto">
                        {value?.name}
                      </button>
                    </div>
                  </Link>
                  <div className="hot-collection-footer">
                    <Link href={`/artist/${value.owner?.[0]?.walletAddress}`}>
                      <button className="btn btn-author truncate m-auto">
                        <img
                          className="author-img"
                          src={
                            value.owner?.[0]?.profilePic ||
                            "/images/profile-picture.webp"
                          }
                        ></img>
                        <span>@{value.owner?.[0]?.name || "Unnamed"}</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {isLoading &&
              [1, 2, 3, 4].map((value, index) => (
                <div key={index}>
                  <div className="hot-collection-card mb-5">
                    <div className="hot-collection-image" role="button"></div>
                    <div className="hot-collection-header">
                      <button className="btn btn-opacity-two truncate m-auto w-50">
                        &nbsp;
                      </button>
                    </div>
                    <div className="hot-collection-footer">
                      <button
                        className="btn btn-author truncate m-auto w-50"
                        style={{ textAlign: "left" }}
                      >
                        <img
                          className="author-img mr-auto"
                          src={"/images/profile-picture.webp"}
                        ></img>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      </div>

      {!isLoading && !list.length && (
        <div className="tabs_item">
          <div className="row">
            <div className="col-12">
              <div className="error-area ptb-100">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="error-content">
                      <h3>No NFT Found</h3>
                      <p>Try different filters. Start selling today!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Collections);
