import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const marketFilter = {
  all: {},
  sale: { isMintOnSale: true },
  fixed: { nftType: "fixed-price" },
  auction: { nftType: "timed-auction" },
};

const sortHash = {
  "low-high": { price: 1 },
  "high-low": { price: -1 },
  "recent": { createdAt: -1 },
  "oldest":  { createdAt: 1 },
  "most-viewed": { totalViews: -1 },
};

const DiscoverTopbar = (props) => {
  const [categories, setcategories] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [selectedMarket, setselectedMarket] = useState("all");
  const [selectedArtist, setselectedArtist] = useState("all");
  const [selectedCategory, setselectedCategory] = useState("all");
  const [userHash, setuserHash] = useState({});
  const [sort, setsort] = useState("recent");
  const router = useRouter();
  
  useEffect(() => {
    if (!Object.keys(router?.query)) return;
    const { market, sort } = router?.query;
    if (marketFilter[market]) setselectedMarket(market);
    if(sortHash[sort] )setsort(sort);
  }, [router?.query]);

  useEffect(() => {
    let _result = props?.filterData?.categories.map((value) => value._id);
    setcategories(_result);
  }, [props?.filterData?.categories]);

  useEffect(() => {
    let _result = props?.filterData?.currentOwner.map((value) => value._id);
    setallUsers(_result);
  }, [props?.filterData?.currentOwner]);

  useEffect(() => {
    setuserHash(props?.user?.allUsersHash);
  }, [props?.user?.allUsersHash]);

  useEffect(() => {
    let filter = {};
    if (selectedMarket != "all") {
      filter = marketFilter[selectedMarket];
    }
    if (selectedCategory != "all") {
      filter["categories.key"] = selectedCategory;
    }
    if (selectedArtist != "all") {
      filter["createdBy"] = selectedArtist;
    }
    let data = {
      sort: sortHash[sort],
      filter,
    };
    props.handleChange(data);
  }, [selectedMarket, selectedArtist, selectedCategory, sort]);

  return (
    <>
      <div className="side-bar-area">
        <div className="row justify-content-center">
          <div className="col">
            <div className="side-bar-widget">
              <h3 className="title">Market</h3>
              <div className="form-group select-group">
                <select
                  className="form-select form-control"
                  value={selectedMarket}
                  onChange={(e) => setselectedMarket(e?.target?.value)}
                >
                  <option value="all"> All</option>
                  <option value="sale"> On Sale</option>
                  <option value="fixed"> Fixed Price</option>
                  <option value="auction"> On Auction</option>
                </select>
              </div>
            </div>
          </div>

          {/* <div className="col">
            <div className="side-bar-widget">
              <h3 className="title">Price</h3>
              <div className="form-group select-group">
                <select className="form-select form-control">
                  <option value="3">3.4 ETH</option>
                </select>
              </div>
            </div>
          </div> */}

          <div className="col">
            <div className="side-bar-widget">
              <h3 className="title">Category</h3>
              <div className="form-group select-group">
                <select
                  className="form-select form-control"
                  value={selectedCategory}
                  onChange={(e) => setselectedCategory(e?.target?.value)}
                >
                  <option value="all"> All</option>
                  {categories.map((value, index) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="side-bar-widget">
              <h3 className="title">Artist</h3>
              <div className="form-group select-group">
                <select
                  className="form-select form-control"
                  value={selectedArtist}
                  onChange={(e) => setselectedArtist(e?.target?.value)}
                >
                  <option value="all"> All</option>
                  {allUsers.map((value) => (
                    <option key={value} value={value}>
                      {userHash[value]?.name || "Unnamed"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="side-bar-widget">
              <h3 className="title">Sort By</h3>
              <div className="form-group select-group">
                <select
                  className="form-select form-control"
                  value={sort}
                  onChange={(e) => setsort(e?.target?.value)}
                >
                  <option value={"low-high"}>Price: Low to High</option>
                  <option value={"high-low"}>Price: High to Low</option>
                  <option value={"recent"}>Recently Listed</option>
                  <option value={"oldest"}>Oldest</option>
                  <option value={"most-viewed"}>Most Viewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { main: state.main, user: state.user };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTopbar);
