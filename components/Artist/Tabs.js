import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import OnSale from "./Tabs/OnSale";
import API from "../../services/API";
import { UpdateUser } from "../../redux/actions/user";
import Collections from "./Tabs/Collections";

function Tabs(props) {
  const [activeTab, setactiveTab] = useState("On sale");
  const [countvalue, setcountvalue] = useState({});
  const [tabs, setTabs] = useState([
    "On sale",
    "Owned",
    "Created",
    "Collections",
    // "Linked",
  ]);
  const [newTabs, setNewTabs] = useState(["Collections"]);
  const { query } = useRouter();
  const { artist } = query;

  useEffect(() => {
    if (artist) getCountDetails();
  }, [artist]);

  const getCountDetails = async () => {
    let result = await API.getUserProfileNFTCount({
      address: artist,
    });
    setcountvalue({
      "On sale": result?.data?.onsale,
      Owned: result?.data?.owner,
      Created: result?.data?.created,
      Collections: result?.data?.collection,
      Linked: result?.data?.like,
    });
  };

  const getDetail = () => {
    switch (activeTab) {
      case "On sale":
        return <OnSale type={activeTab} artist={artist} />;
      case "Owned":
        return <OnSale type={activeTab} artist={artist} />;
      case "Created":
        return <OnSale type={activeTab} artist={artist} />;
      case "Collections":
        return <Collections artist={artist} />;
    }
  };

  //   useEffect(() => {
  //     document.getElementById("artist-nft-card-area").scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }, [activeTab]);

  return (
    <>
      <div
        id="artist-nft-card-area"
        style={{ borderBottom: "1px solid #00FF47" }}
      >
        <div className="author-nav-tab-wrapper">
          {tabs.map((value, index) => (
            <NavTabWrapper
              key={index}
              value={value}
              active={value === activeTab}
              setactiveTab={setactiveTab}
              new={newTabs.includes(value)}
              count={countvalue[value]}
            />
          ))}
        </div>
      </div>
      <div>{getDetail()}</div>
    </>
  );
}

const NavTabWrapper = (props) => {
  return (
    <div
      className="author-nav-tab"
      style={props?.active ? { borderBottom: "2px solid #ffb302" } : {}}
      onClick={() => props.setactiveTab(props?.value)}
    >
      <span style={{ color: "white" }}>{props?.value}</span>
      {props?.count !== undefined && (
        <span className="tab-batch" style={{ color: "97979B" }}>
          {props?.count}
        </span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  UpdateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
