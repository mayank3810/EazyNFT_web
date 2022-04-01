import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { debounce } from "lodash";

import API from "../../services/API";
import { useWindowSize } from "../../services/hooks";
import Web3 from "web3";
import NFTCard2 from "../NFTCard/NFTCard2";

const filters = (owner, createdBy, type, tokenId) => {
  let obj = {
    "More from the Artist": {
      $and: [{ createdBy: createdBy }, { tokenId: { $ne: tokenId } }],
    },
    "More from the Owner": {
      $and: [
        { currentOwnerList: Web3.utils.toChecksumAddress(owner) },
        { tokenId: { $ne: tokenId } },
      ],
    },
  };
  return obj[type];
};

const SuggestionList = (props) => {
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
      owner: props?.owner,
      createdBy: props?.createdBy,
      type: props?.type,
      tokenId: props?.tokenId,
    });
  }, [page]);

  useEffect(() => {
    setlist([]);
    setpage(0);
    debounceCollectiables({
      page: 0,
      owner: props?.owner,
      createdBy: props?.createdBy,
      type: props?.type,
      tokenId: props?.tokenId,
    });
  }, [props?.type, props?.owner, props?.createdBy]);

  const debounceCollectiables = useCallback(
    debounce((q) => getAllCollectiables(q), 100),
    []
  );

  const getAllCollectiables = ({ page, owner, createdBy, type, tokenId }) => {
    let data = {
      page,
      limit: 12,
      filter: filters(owner, createdBy, type, Number(tokenId)),
      perPage: 4,
      sort: { totalViews: -1 },
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
              {list.slice(0, grid == 3 ? grid : 4).map((value, index) => (
                <NFTCard2 key={index} value={value} />
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
                          <h3 className="text-dark">No NFT Found</h3>
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
export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList);
