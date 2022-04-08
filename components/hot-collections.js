import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import API from "../services/API";
import { useWindowSize } from "../services/hooks";

function HotCollections(props) {
  const [list, setlist] = useState([]);
  const [page, setpage] = useState(-1);
  const [isLoading, setisLoading] = useState(false);
  const [grid, setgrid] = useState(4);
  const ref = useRef();
  const size = useWindowSize();
  const owner = props?.userinfo?.user?.walletAddress;

  useEffect(async () => {
    getAllCollectiables(0);
  }, []);

  useEffect(() => {
    const _width = ref?.current?.offsetWidth || size?.width;
    const _grid = Math.floor(_width / 277);
    setgrid(_grid);
  }, [size?.width]);

  const getAllCollectiables = () => {
    if (isLoading) return;
    let _page = page + 1;
    setpage(_page);
    let data = {
      page: _page,
      walletAddress: owner,
      perPage: 4,
    };

    setisLoading(true);
    API.getCollections(data)
      .then((response) => {
        setlist([...response?.data?.result?.slice(0, 4)]);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  return (
    <div className="bg-dark pt-5">
      <div className="container hot-collections-container">
        <div className="row ">
          <div className="col-12">
            <h2 className="mb-4">collections</h2>
          </div>
          <div
            className="row hot-colection-card-wrapper"
            ref={ref}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid}, 1fr)`,
            }}
          >
            {(grid === 3 ? list.slice(0, 3) : list)?.map((value, index) => (
              <div key={`${index}/${value.name}`} className="mb-5">
                <div className="hot-collection-card">
                  {/* <Link href={`/collection/${value.name}`}> */}
                  <div className="hot-collection-image" role="button">
                    <img src={value?.banner}></img>
                  </div>
                  {/* </Link> */}
                  {/* <Link href={`/collection/${value.name}`}> */}
                  <div className="hot-collection-header">
                    <button className="btn btn-opacity-two truncate m-auto">
                      {value?.name}
                    </button>
                  </div>
                  {/* </Link> */}
                  <div className="hot-collection-footer">
                    {/* <Link href={`/artist/${value.owner?.[0]?.walletAddress}`}> */}
                    <button className="btn btn-author truncate m-auto">
                      <img
                        className="author-img"
                        src={value.logo || "/images/profile-picture.webp"}
                      ></img>
                      <span>@{value.name || "Unnamed"}</span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="trending-btn text-end">
            <Link href="/collections">
              <a className="default-btn border-radius-5 mr-2">More</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HotCollections);
