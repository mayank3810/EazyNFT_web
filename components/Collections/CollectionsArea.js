import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import API from "../../services/API";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useWindowSize } from "../../services/hooks";

const DiscoverArea = (props) => {
  const router = useRouter();
  const [list, setlist] = useState([]);
  const [page, setpage] = useState(-1);
  const [isLoading, setisLoading] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [grid, setgrid] = useState(4);
  const ref = useRef();
  const size = useWindowSize();
  const owner = router?.query?.owner;

  useEffect(async () => {
    getAllCollectiables(0);
  }, []);

  useEffect(() => {
    const _width = ref?.current?.offsetWidth || size?.width;
    const _grid = Math.floor(_width / 283);
    setgrid(_grid);
  }, [size?.width]);

  const getAllCollectiables = () => {
    if (isLoading) return;
    let _page = page + 1;
    setpage(_page);
    let data = {
      page: _page,
      walletAddress: owner,
    };

    setisLoading(true);
    API.getCollections(data)
      .then((response) => {
        if (response?.data?.result?.length < 12) {
          sethasMore(false);
        }
        setlist([...list, ...response?.data?.result]);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  return (
    <>
      <div className="discover-area bg-darker">
        <div className="section-title d-flex justify-content-between">
          <h2 style={{ display: "inline" }}>Manage Collections </h2>
          <div
            className="default-btn border-radius-5"
            onClick={() => router.push("/create-collection")}
            style={{ width: "220px" }}
          >
            Create Collection
          </div>
        </div>

        <div className="w-100 mt-5" ref={ref}>
          <InfiniteScroll
            dataLength={Math.floor(list.length / grid)}
            next={getAllCollectiables}
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
                [1, 2, 3, 4, 5, 6].map((index) => (
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

          {!list.length && !isLoading && (
            <div className="tabs_item">
              <div className="row">
                <div className="col-12">
                  <div className="error-area ptb-100">
                    <div className="d-table">
                      <div className="d-table-cell">
                        <div className="error-content">
                          <h3>No Collection Found</h3>
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
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverArea);
