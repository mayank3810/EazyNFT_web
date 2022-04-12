import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import API from "../../services/API";
import SuggestionList from "./SuggestionList";

function Tabs(props) {
  const [activeTab, setactiveTab] = useState("More from the Artist");
  const [tabs, setTabs] = useState([
    "More from the Artist",
    "More from the Owner",
  ]);
  const [artistCount, setartistCount] = useState(0);
  const [ownerCount, setownerCount] = useState(0);
  const [newTabs, setNewTabs] = useState([]);
  const { query } = useRouter();
  const { user } = props.userinfo;

  useEffect(() => {
    if (props?.token?.owner) getCountDetails("owner", props?.token?.owner);
  }, [props?.token?.owner]);

  useEffect(() => {
    if (props?.token?.createdBy?.walletAddress)
      getCountDetails("created", props?.token?.createdBy?.walletAddress);
  }, [props?.token?.createdBy?.walletAddress]);

  const getCountDetails = async (type, wallet) => {
    let result = await API.getUserProfileNFTCount({
      address: wallet,
    });
    if (type == "created") setartistCount(result?.data?.created);
    else if (type == "owner") setownerCount(result?.data?.created);
  };

  const getCount = (key) => {
    switch (key) {
      case "More from the Artist":
        return artistCount;
      case "More from the Owner":
        return ownerCount;
      default:
        return 0;
    }
  };

  return (
    <div className="mb-5">
      <div
        id="artist-nft-card-area"
        style={{ borderBottom: "1px solid #ffb302" }}
        className="mt-5"
      >
        <div
          className="author-nav-tab-wrapper justify-content-start"
          style={{ marginLeft: "3%" }}
        >
          {tabs.map((value, index) => (
            <NavTabWrapper
              key={index}
              value={value}
              active={value === activeTab}
              setactiveTab={setactiveTab}
              new={newTabs.includes(value)}
              count={getCount(value)}
            />
          ))}
        </div>
      </div>
      <SuggestionList
        type={activeTab}
        tokenId={query?.tokenId}
        owner={props?.token?.owner}
        createdBy={props?.token?.createdBy?.walletAddress}
      />
    </div>
  );
}

const NavTabWrapper = (props) => {
  return (
    <div
      className="author-nav-tab"
      style={
        props?.active
          ? { borderBottom: "2px solid #040405", marginLeft: 0 }
          : { marginLeft: 0 }
      }
      onClick={() => props.setactiveTab(props?.value)}
    >
      <span style={{ color: props?.active ? "#040405" : undefined }}>
        {props?.value}
      </span>
      {props?.count != undefined && (
        <span
          className="tab-batch"
          style={props?.active ? { color: "white", background: "#040405" } : {}}
        >
          {props?.count}
        </span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
